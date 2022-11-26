import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "../FreindList/MesageItem";
import style from "./ModalCreateGroup.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
    closeModalAddMember,
    oppenModalAddMember,
} from "../redux/statusCommon/slice";
import { useEffect } from "react";
import axios from "axios";
import userAPI from "../redux/user/userAPI";
import UserItem from "../FreindList/UserItem";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        height: "85vh",
    },
};

let listUserId: String[] = [];

const addUser = (userId: String) => {
    const isExist = listUserId.findIndex((e) => e == userId) != -1;
    if (isExist) {
        // remove
        listUserId = listUserId.filter((e) => e != userId);
    } else {
        listUserId.push(userId);
    }
};

function ModalAddMember() {
    const dispatch = useAppDispatch();
    const commonState = useAppSelector((state: any) => state.statusCommon);
    // const commonState =  useAppSelector((state: any) => state.statusCommon);

    // const [modalIsOpen, setIsOpen] = useState(false);

    const [friends, setfriends] = useState([]);
    const userState = useAppSelector((state: any) => state.user);
    const token = userState.accessToken;
    const listRooms = userState.rooms;
    const roomState = useAppSelector((state: any) => state.room);
    const roomId = String(roomState._id);
    const myRoom = listRooms.find((room: any) => String(room._id) == roomId);
    console.log(roomId);

    useEffect(() => {
        axios
            .get(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}/user-vailable-add-room`,
                {
                    headers: { authorization: token as string },
                }
            )
            .then((r: any) => {
                // const listFiendAvalible = r.data.filter((friend: any) => {
                //   return !myRoom?.users.find((user: any) => {
                //     return String(user._id) == String(friend.userId._id);
                //   });
                // });
                console.log(r);

                setfriends(r.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [commonState.isOpenModalAddMember]);

    const addMemberGroup = () => {
        if (listUserId.length == 0) {
            alert("Bạn cần chọn ít nhất 1 người");
            return;
        }
        axios
            .put(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}/users`,
                {
                    userIds: listUserId,
                },
                {
                    headers: { authorization: token as string },
                }
            )
            .then((r: any) => {
                dispatch(closeModalAddMember());
                setfriends([]);
                console.log(r.data);

                // dispatch(userAPI.updateListRoomUI()(r.data));
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <ReactModal
                style={customStyles}
                isOpen={commonState.isOpenModalAddMember}
                onRequestClose={() => dispatch(closeModalAddMember())}
            >
                <div className={style.Modal_createGroup}>
                    <div className={style.Modal_createGroup_head}>
                        <div className={style.Modal_createGroup_head_title}>
                            Thêm thành viên vào nhóm
                        </div>
                        <div className={style.Modal_createGroup_head_close}>
                            <IoMdClose
                                onClick={() => dispatch(closeModalAddMember())}
                            />
                        </div>
                    </div>

                    {/* <div className={style.Modal_createGroup_name_group}>
                        <div
                            className={
                                style.Modal_createGroup_name_group_iconBlock
                            }
                        >
                            <HiOutlineCamera />
                        </div>
                        <div
                            className={
                                style.Modal_createGroup_name_group_name_group
                            }
                        >
                            <input
                                type="text"
                                placeholder="Nhập tên nhóm..."
                            />
                        </div>
                    </div> */}
                    {/* <div className={style.add_group_title}>
                        Thêm bạn vào nhóm
                    </div> */}
                    <div className={style.search_menber_block}>
                        <div className={style.search_menber_icon}>
                            <FiSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập tên, số diện thoại, hoặc danh sách số điện thoại"
                        />
                    </div>
                    <hr />
                    <div className={style.add_group_title_chat_late}>
                        Trò chuyện gần đây
                    </div>
                    <div className={style.listMember}>
                        {friends?.map((friend: any) => {
                            return (
                                <UserItem
                                    _id={friend.userId._id}
                                    avatar={
                                        friend.userId.avatar ||
                                        "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                                    }
                                    name={friend.userId.email}
                                    messages="Hello jjj"
                                    time={new Date().toDateString()}
                                    info={true}
                                    addUser={addUser}
                                />
                            );
                        })}
                    </div>
                    <div className={style.Modal_footer}>
                        <button className={style.btn_modal_cancel}>Hủy</button>
                        {/* <button className={style.btn_modal_create}>Tạo nhóm</button> */}

                        <button
                            className={style.btn_modal_create}
                            onClick={() => addMemberGroup()}
                        >
                            Thêm
                        </button>
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ModalAddMember;
