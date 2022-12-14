import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "../FreindList/MesageItem";
import style from "./ModalCreateGroup.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { closeManageMember } from "../redux/statusCommon/slice";
import { useEffect } from "react";
import axios from "axios";
import ManageUserItem from "../FreindList/ManageUserItem";

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

function ModalManageMember() {
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
  const deleteUser = (userId: String) => {
    axios
      .delete(`https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}/users/${userId}`, {
        headers: { authorization: token as string },
      })
      .then(({ data }: any) => {
        setfriends(friends.filter((e: any) => String(e.userId._id) != userId));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (roomId)
      axios
        .get(`https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}`, {
          headers: { authorization: token as string },
        })
        .then(({ data }: any) => {
          const users: any = data.users.map((e: any) => {
            return { userId: e.user };
          });
          setfriends(users);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [commonState.isOpenModalManageMember]);

  return (
    <div>
      <ReactModal
        style={customStyles}
        isOpen={commonState.isOpenModalManageMember}
        onRequestClose={() => dispatch(closeManageMember())}
      >
        <div className={style.Modal_createGroup}>
          <div className={style.Modal_createGroup_head}>
            <div className={style.Modal_createGroup_head_title}>
              Danh s??ch th??nh vi??n
            </div>
            <div className={style.Modal_createGroup_head_close}>
              <IoMdClose onClick={() => dispatch(closeManageMember())} />
            </div>
          </div>

          <div className={style.search_menber_block}>
            <div className={style.search_menber_icon}>
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Nh???p t??n, s??? di???n tho???i, ho???c danh s??ch s??? ??i???n tho???i"
            />
          </div>
          <hr />
          <div className={style.add_group_title_chat_late}>
            {/* Tr?? chuy???n g???n ????y */}
          </div>
          <div className={style.listMember}>
            {friends?.map((friend: any) => {
              return (
                <ManageUserItem
                  _id={friend.userId._id}
                  avatar={
                    friend.userId.avatar ||
                    "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                  }
                  name={friend.userId.email}
                  messages="Hello jjj"
                  time={new Date().toDateString()}
                  info={true}
                  deleteUser={deleteUser}
                />
              );
            })}
          </div>
          <div className={style.Modal_footer}>
            <button className={style.btn_modal_cancel}>H???y</button>
            {/* <button className={style.btn_modal_create}>T???o nh??m</button> */}

            <button className={style.btn_modal_create} onClick={() => {}}>
              Th??m
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default ModalManageMember;
