import { useState } from "react";
import style from "./Manager.module.css";
import Search from "../FreindList/Search";
import { AiOutlineUserAdd } from "react-icons/ai";
import RequestAddFriendItem from "./RequestAddFriendItem";
import GroupItem from "./GroupItem";
import ModalSearch from "../common/ModalSearch";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
    oppenModalSearch,
    closeModalsearch,
} from "../redux/statusCommon/slice";
import ModalInfo from "../common/ModalInfo";
import axios from "axios";
import tokenService from "../services/token.service";
import userAPI from "../redux/user/userAPI";

function Manager() {
    const userState = useAppSelector((state: any) => state.user);
    const token = tokenService.getAccessToken();
    function handlAccept(id: any) {
        console.log("---------========" + id);
        axios
            .post(
                `https://frozen-caverns-53350.herokuapp.com/api/users/invites`,
                {
                    userId: id,
                },
                {
                    headers: { authorization: token as string },
                }
            )
            .then((r: any) => {
                console.log("done");
            })
            .catch((err) => {
                console.log(err);
            });
        dispatch(userAPI.deleteRequestAddFriend()(id));

        axios
            .get(`https://frozen-caverns-53350.herokuapp.com/api/rooms/users/${id}`, {
                headers: { authorization: token as string },
            })
            .then((r: any) => {
                console.log({ newData: r, id });

                dispatch(userAPI.updateListRoomUI()(r.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handlAvoid(id: any) {
        console.log("---------========" + id);
        axios
            .delete(`https://frozen-caverns-53350.herokuapp.com/api/users/invites`, {
                data: { userId: id },
                headers: { authorization: token as string },
            })
            .then((r: any) => {
                console.log("done");
            })
            .catch((err) => {
                console.log(err);
            });
        dispatch(userAPI.deleteRequestAddFriend()(id));
    }
    function handelAddFriend(id: any) {
        axios
            .post(
                `https://frozen-caverns-53350.herokuapp.com/api/users/invites`,
                {
                    user: id,
                },
                {
                    headers: { authorization: token as string },
                }
            )
            .then((r: any) => {
                createRoom(id);
            })
            .catch((err) => {
                console.log(err);
            });

        function createRoom(id: any) {
            axios
                .get(`https://frozen-caverns-53350.herokuapp.com/api/rooms/users/${id}`, {
                    headers: { authorization: token as string },
                })
                .then((r: any) => {
                    console.log("done create room");
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }
    const stateUser = useAppSelector((state: any) => state.user);
    let listRequest = stateUser.listRequest || [];
    console.log(listRequest);

    const dispatch = useAppDispatch();
    const [isRequestAddFriend, setisRequestAddFriend] = useState(true);
    return (
        <div className={style.container}>
            <div className={style.left}>
                <Search />
                <div
                    className={style.addFriendByPhhoneNumber}
                    onClick={() => {
                        dispatch(oppenModalSearch());
                    }}
                >
                    <AiOutlineUserAdd />
                    <div style={{ fontSize: "14px", marginLeft: "10px" }}>
                        Thêm bạn bằng số điện thoại
                    </div>
                </div>
                <div
                    className={style.itemComponent}
                    onClick={() => setisRequestAddFriend(true)}
                >
                    <div className={style.image}>
                        <img
                            src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"
                            alt=""
                        />
                    </div>
                    <div style={{ fontSize: "14px" }}>Danh sách kết bạn</div>
                </div>
                <div
                    className={style.itemComponent}
                    onClick={() => setisRequestAddFriend(false)}
                >
                    <div className={style.image}>
                        <img
                            src="https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png"
                            alt=""
                        />
                    </div>
                    <div style={{ fontSize: "14px" }}>Danh sách nhóm</div>
                </div>
            </div>
            <div className={style.right}>
                {isRequestAddFriend ? (
                    <div className={style.listRequestAddFriend}>
                        <div className={style.listRequestAddFriend_header}>
                            <div
                                className={
                                    style.listRequestAddFriend_header_img
                                }
                            >
                                <img
                                    src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png"
                                    alt=""
                                />
                            </div>
                            <div
                                className={
                                    style.listRequestAddFriend_header_title
                                }
                            >
                                Danh sách lời mời kết bạn
                            </div>
                        </div>

                        <div
                            style={{
                                fontSize: "14px",
                                margin: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            Lời mời kết bạn (1)
                        </div>
                        <div className={style.listRequestAddFriend_container}>
                            {listRequest.map((e: any) => {
                                return (
                                    <div
                                        className={
                                            style.listRequestAddFriend_item
                                        }
                                    >
                                        <div
                                            className={
                                                style.listRequestAddFriend_item_info
                                            }
                                        >
                                            <div
                                                className={
                                                    style.listRequestAddFriend_item_img
                                                }
                                            >
                                                <img
                                                    src={
                                                        e.user?.avatar ||
                                                        "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                                    }
                                                    alt=""
                                                />
                                            </div>
                                            <div style={{ fontSize: "14px" }}>
                                                {e?.user?.email}
                                            </div>
                                        </div>
                                        <div
                                            className={
                                                style.listRequestAddFriend_item_btn
                                            }
                                        >
                                            <button
                                                style={{
                                                    width: "100px",
                                                    fontSize: "14px",
                                                    borderRadius: "5px",
                                                    height: "30px",
                                                    border: "1px solid #ccc",
                                                }}
                                                onClick={() =>
                                                    handlAvoid(e.user._id)
                                                }
                                            >
                                                Từ chối
                                            </button>
                                            <button
                                                style={{
                                                    marginLeft: "10px",
                                                    width: "100px",
                                                    fontSize: "14px",
                                                    borderRadius: "5px",
                                                    height: "30px",
                                                    border: "1px solid #ccc",
                                                    backgroundColor: "#0068ff",
                                                    color: "#fff",
                                                }}
                                                onClick={() =>
                                                    handlAccept(e.user._id)
                                                }
                                            >
                                                Chấp nhận
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className={style.listRequestAddFriend}>
                        <div className={style.listRequestAddFriend_header}>
                            <div
                                className={
                                    style.listRequestAddFriend_header_img
                                }
                            >
                                <img
                                    src="https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png"
                                    alt=""
                                />
                            </div>
                            <div
                                className={
                                    style.listRequestAddFriend_header_title
                                }
                            >
                                Danh sách nhóm
                            </div>
                        </div>

                        <div
                            style={{
                                fontSize: "14px",
                                margin: "10px",
                                fontWeight: "bold",
                            }}
                        >
                            Số lượng nhóm (1)
                        </div>
                        <div className={style.listRequestAddFriend_container}>
                            <div className={style.group_container}>
                                <GroupItem />
                                <GroupItem />
                                <GroupItem />
                                <GroupItem />
                                <GroupItem />
                                <GroupItem />
                                <GroupItem />
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <ModalSearch />
            <ModalInfo />
        </div>
    );
}

export default Manager;
