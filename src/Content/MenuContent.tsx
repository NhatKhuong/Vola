import { useState } from "react";
import style from "./Content.module.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineUserSwitch } from "react-icons/ai";
import { BiLogOutCircle } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import ImageGrid from "../common/ImageGrid";
import ExpandComponent from "../common/ExpandComponent";
import ItemFileLink from "./ItemFileLink";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CgDanger } from "react-icons/cg";
import userAPI from "../redux/user/userAPI";
import {
  oppenModalAddMember,
  oppenModalUpdateRoomInfo,
  oppenManageMember,
  oppenModalPermission,
} from "../redux/statusCommon/slice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import ModalAddMember from "../common/ModalAddMember";
import ModalUpdateRoomInfo from "../common/ModalUpdateRoomInfo";
import ModalManageMember from "../common/ModalManageMember";
import axios from "axios";
import ModalPermission from "../common/ModalPermission";

function MenuContent() {
  const userState = useAppSelector((state: any) => state.user);
  const token = userState.accessToken;
  const roomState = useAppSelector((state: any) => state.room);
  const listRooms = userState.rooms;
  console.log(roomState);
  console.log(userState.user._id);


  let arrayPic = new Array();
  // let arrayFile = new Array();

  // var nameFile = props.message.split("___").at(-1);
  // var typeName = nameFile?.split(".")[1];

  console.log(roomState.lstFile);
  console.log(roomState.lstPic);

  roomState.lstPic.forEach((item: any) => {
    arrayPic.push(item.content);
  });

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(oppenModalAddMember());
  };
  const handleClickMembers = () => {
    dispatch(oppenManageMember());
  };

  const leafRomm = () => {
    axios({
      method: "DELETE",
      url: `http://18.140.239.96/api/rooms/${roomState._id}/users/${userState.user._id}`,
      headers: { authorization: token as string },
    }).then(() => {
      alert("Xóa thành công!")
    }).catch((err) => {
      alert(err)
    })
    dispatch(userAPI.deleteRoomByIdUI()(roomState._id));
  }

  const deleteGroupHandleClick = () => {
    var roomId = roomState._id;
    dispatch(userAPI.deleteRoomByIdUI()(roomId));
    axios
      .delete(`http://18.140.239.96/api/rooms/${roomId}`, {
        headers: { authorization: token as string },
      })
      .then(() => {
        const listRoom = listRooms?.filter(
          (e: any) => String(e._id) != roomState._id
        );
        console.log(listRoom);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className={style.menuContent}>
      <div className={style.menuContent_header}>
        <h5
          style={{
            textAlign: "center",
            alignItems: "center",
            width: "100%",
            height: "100%",
            lineHeight: "70px",
          }}
        >
          Thông tin hội thoại
        </h5>
      </div>
      <div className={style.menuContent_body}>
        <div className={style.menuContent_header_info}>
          <img src={roomState.avatar} alt="" />
          {roomState.owner === userState.user._id ? (
            <div className={style.name}>
              {roomState.name}
              <AiFillEdit
                onClick={() =>
                  dispatch(oppenModalUpdateRoomInfo())
                }
              />
              <div onClick={() => dispatch(oppenModalPermission())} className={style.keyperrmission} style={{ marginLeft: "20px" }}>
                <img style={{ height: "20px", width: "20px", objectFit: "cover" }} src="https://www.pngitem.com/pimgs/m/34-347182_key-emoji-cutouts-key-emoji-transparent-hd-png.png" alt="" />
              </div>
            </div>
          ) : (
            ""
          )}

          <div className={style.menuContent_header_info_listAction}>
            {/* {roomState.owner === userState.user._id ? 
      
            } */}
            <div
              className={
                style.menuContent_header_info_listAction_item
              }
              onClick={() => {
                if (roomState.owner === userState.user._id) {
                  var result =
                    window.confirm("Bạn là nhóm trưởng hãy gán lại quyền trước khi rời nhóm");
                  if (result) dispatch(oppenModalPermission());
                } else {
                  var result =
                    window.confirm("Bạn có muốn rời nhóm ?");
                  if (result) leafRomm();
                }

              }}
            >
              <BiLogOutCircle />
              <p
                className={
                  style.menuContent_header_info_listAction_item_name
                }
              >
                Rời nhóm
              </p>
            </div>
            <div
              className={
                style.menuContent_header_info_listAction_item
              }
            >
              <AiOutlineUserSwitch
                onClick={() => handleClickMembers()}
              />
              <p
                className={
                  style.menuContent_header_info_listAction_item_name
                }
              >
                Thành viên
              </p>
            </div>
            {roomState.owner === userState.user._id ? (
              <div
                className={
                  style.menuContent_header_info_listAction_item
                }
              >
                <AiOutlineUsergroupAdd
                  onClick={() => handleClick()}
                />
                <p
                  className={
                    style.menuContent_header_info_listAction_item_name
                  }
                >
                  Thêm thành viên
                </p>
              </div>
            ) : (
              ""
            )}
            {/* // <div className={style.menuContent_header_info_listAction_item}>
            //   <AiOutlineUsergroupAdd onClick={() => handleClick()} />
            //   <p className={style.menuContent_header_info_listAction_item_name}>
            //     Thêm thành viên
            //   </p>
            // </div> */}

            {roomState.owner === userState.user._id ? (
              <div
                className={
                  style.menuContent_header_info_listAction_item
                }
              >
                <AiFillDelete
                  onClick={() => {
                    var result =
                      window.confirm("Xóa nhóm ?");
                    if (result) deleteGroupHandleClick();
                  }}
                />
                <p
                  className={
                    style.menuContent_header_info_listAction_item_name
                  }
                >
                  Xóa nhóm
                </p>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <ExpandComponent title="Ảnh/Video">
          <div className={style.images}>
            <ImageGrid

              images={arrayPic}
            />
          </div>
        </ExpandComponent>

        <ExpandComponent title="Files">
          <div className={style.files}>
            {roomState.lstFile.map((item: any) => {
              var nameFile = item.content.split("___").at(-1);
              var typeName = nameFile?.split(".")[1];
              var urlPic: any;
              if (typeName === "pdf") {
                urlPic =
                  "https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ";
              } else if (
                typeName === "doc" ||
                typeName === "docx"
              ) {
                urlPic =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/2048px-.docx_icon.svg.png";
              } else if (typeName === "xlsx") {
                urlPic =
                  "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/.xlsx_icon.svg/2048px-.xlsx_icon.svg.png";
              } else if (typeName === "pptx") {
                urlPic =
                  "https://www.freeiconspng.com/thumbs/ppt-icon/powerpoint-icon-microsoft-powerpoint-icon-network-powerpoint-icons-and-3.png";
              }
              return (
                <ItemFileLink
                  avatar={urlPic}
                  name={nameFile}
                  discription="4KB"
                  time={new Date(item.createdAt)}
                  isFile={true}
                />
              );
            })}

          </div>
        </ExpandComponent>
        <ExpandComponent title="Thiết lập bảo mật">
          <div className={style.funtions}>
            <div className={style.funtion_item}>
              <div className={style.funtion_item_icon}>
                <RiDeleteBin6Line />
              </div>
              <div className={style.funtion_item_name}>
                Xóa lịch sử trò chuyện
              </div>
            </div>

            <div className={style.funtion_item}>
              <div className={style.funtion_item_icon}>
                <CgDanger />
              </div>
              <div className={style.funtion_item_name}>Chặn</div>
            </div>
          </div>
        </ExpandComponent>

        <div className={style.menuContent_file}></div>
        <div className={style.menuContent_link}></div>
        <div className={style.menuContent_setting}></div>
      </div>
      <ModalAddMember />
      <ModalUpdateRoomInfo />
      <ModalManageMember />
      <ModalPermission />
    </div>
  );
}

export default MenuContent;
