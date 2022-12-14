import { useState } from "react";
import style from "./Content.module.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineUserSwitch } from "react-icons/ai";
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
} from "../redux/statusCommon/slice";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import ModalAddMember from "../common/ModalAddMember";
import ModalUpdateRoomInfo from "../common/ModalUpdateRoomInfo";
import ModalManageMember from "../common/ModalManageMember";
import axios from "axios";

function MenuContent() {
  const userState = useAppSelector((state: any) => state.user);
  const token = userState.accessToken;
  const roomState = useAppSelector((state: any) => state.room);
  const listRooms = userState.rooms;
  console.log(roomState);
  console.log(roomState.getListPic);
  console.log(roomState.getListFile);
  
  

  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(oppenModalAddMember());
  };
  const handleClickMembers = () => {
    dispatch(oppenManageMember());
  };

  const deleteGroupHandleClick = () => {
    var roomId = roomState._id;
    dispatch(userAPI.deleteRoomByIdUI()(roomId))
    axios
      .delete(`https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}`, {
        headers: { authorization: token as string },
      })
      .then(() => {
        const listRoom = listRooms?.filter(
          (e: any) => String(e._id) != roomState._id
        );
        console.log(listRoom);

        // error here

        // dispatch(
        //   userAPI.updateListRoomUI()(
        //     listRooms?.filter((e: any) => String(e._id) != roomState._id)
        //   )
        // );
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
          Th??ng tin h???i tho???i
        </h5>
      </div>
      <div className={style.menuContent_body}>
        <div className={style.menuContent_header_info}>
          <img src={roomState.avatar} alt="" />
          {roomState.owner === userState.user._id
          ? ( <div className={style.name}>
            {roomState.name}
            <AiFillEdit onClick={() => dispatch(oppenModalUpdateRoomInfo())} />
          </div>)
          :""
          }
         
          <div className={style.menuContent_header_info_listAction}>
            <div className={style.menuContent_header_info_listAction_item}>
              <IoMdNotificationsOutline />
              <p className={style.menuContent_header_info_listAction_item_name}>
                T???c th??ng b??o
              </p>
            </div>
            <div className={style.menuContent_header_info_listAction_item}>
              <AiOutlineUserSwitch onClick={() => handleClickMembers()} />
              <p className={style.menuContent_header_info_listAction_item_name}>
                Th??nh vi??n
              </p>
            </div>
            {roomState.owner === userState.user._id
              ? (<div className={style.menuContent_header_info_listAction_item}>
              <AiOutlineUsergroupAdd onClick={() => handleClick()} />
              <p className={style.menuContent_header_info_listAction_item_name}>
                Th??m th??nh vi??n
              </p>
            </div>)
            : ""
            }
            {/* // <div className={style.menuContent_header_info_listAction_item}>
            //   <AiOutlineUsergroupAdd onClick={() => handleClick()} />
            //   <p className={style.menuContent_header_info_listAction_item_name}>
            //     Th??m th??nh vi??n
            //   </p>
            // </div> */}

            {roomState.owner === userState.user._id
              ? ( <div className={style.menuContent_header_info_listAction_item}>
                <AiFillDelete
                  onClick={() => {
                    var result = window.confirm("X??a nh??m ?");
                    if (result) deleteGroupHandleClick();
                  }}
                />
                <p className={style.menuContent_header_info_listAction_item_name}>
                  X??a nh??m
                </p>
              </div>)
             : "" } 
           
          </div>
        </div>

        <ExpandComponent title="???nh/Video">
          <div className={style.images}>
            <ImageGrid
              images={[
                "https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/thutrang/2020_11_24/2/dang-chuan-mat-dep-gai-xinh-ha-thanh-khien-dan-tinh-xao-xuyen.jpg",
                "https://media.baodautu.vn/Images/chicuong/2019/07/27/mvl7y4jk.jpg",
                "https://viettelhochiminh.com.vn/wp-content/uploads/2022/05/hinh-anh-gai-xinh-nhat-ban-11.jpg",
                "https://kenh14cdn.com/2020/9/27/img3814-16008495660052057963035-16012244314321556076455.jpg",
                "https://media.baodautu.vn/Images/chicuong/2019/07/27/mvl7y4jk.jpg",
                "https://viettelhochiminh.com.vn/wp-content/uploads/2022/05/hinh-anh-gai-xinh-nhat-ban-11.jpg",
                "https://kenh14cdn.com/2020/9/27/img3814-16008495660052057963035-16012244314321556076455.jpg",
              ]}
            />
          </div>
        </ExpandComponent>

        <ExpandComponent title="Files">
          <div className={style.files}>
            <ItemFileLink
              avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
              name="File PDF"
              discription="4KB"
              time={new Date()}
              isFile={true}
            />
            <ItemFileLink
              avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
              name="File PDF"
              discription="4KB"
              time={new Date()}
              isFile={true}
            />
            <ItemFileLink
              avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
              name="File PDF"
              discription="4KB"
              time={new Date()}
              isFile={true}
            />
            <ItemFileLink
              avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
              name="File PDF"
              discription="4KB"
              time={new Date()}
              isFile={true}
            />
          </div>
        </ExpandComponent>

        <ExpandComponent title="Links">
          <div className={style.files}>
            <ItemFileLink
              avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              discription="4KB"
              time={new Date()}
              isFile={false}
            />
            <ItemFileLink
              avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              discription="4KB"
              time={new Date()}
              isFile={false}
            />
            <ItemFileLink
              avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              discription="4KB"
              time={new Date()}
              isFile={false}
            />
            <ItemFileLink
              avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              discription="4KB"
              time={new Date()}
              isFile={false}
            />
            <ItemFileLink
              avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
              discription="4KB"
              time={new Date()}
              isFile={false}
            />
          </div>
        </ExpandComponent>
        <ExpandComponent title="Thi???t l???p b???o m???t">
          <div className={style.funtions}>
            <div className={style.funtion_item}>
              <div className={style.funtion_item_icon}>
                <RiDeleteBin6Line />
              </div>
              <div className={style.funtion_item_name}>
                X??a l???ch s??? tr?? chuy???n
              </div>
            </div>

            <div className={style.funtion_item}>
              <div className={style.funtion_item_icon}>
                <CgDanger />
              </div>
              <div className={style.funtion_item_name}>Ch???n</div>
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
    </div>
  );
}

export default MenuContent;
