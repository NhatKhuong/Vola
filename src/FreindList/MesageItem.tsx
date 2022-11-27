import React from "react";
import style from "./FreindList.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import roomAPI from "../redux/Room/roomAPI";
import { CgEnter } from "react-icons/cg";
interface Props {
  avatar?: string;
  name?: string;
  messages?: string;
  time?: string;
  info: boolean;
  _id?: string;
  addUser?: any;
  owner?: string;
  permission?:boolean;
}
function MesageItem({
  avatar,
  name,
  messages,
  time,
  info,
  _id,
  addUser,
  owner,
  permission,
}: Props) {
  const dispatch = useAppDispatch();
  const roomState = useAppSelector((state: any) => state.room);
  const userState = useAppSelector((state: any) => state.user);
  const accessToken = userState.accessToken;
  const showRoom = () => {
    if(!info){

      dispatch(roomAPI.getListChat()({ accessToken, _id }));
      dispatch(roomAPI.saveRoomId()({ _id, name, avatar, owner }));
      dispatch(roomAPI.getListFile()({ accessToken, _id }));
      dispatch(roomAPI.getListPic()({ accessToken, _id }));
    }
  };

  const onChangeCheckBox = () => {
    addUser(_id);
  };
  console.log(owner);
  console.log(roomState._id);
  
  

  return (
    <div className={style.messageItem} onClick={showRoom}>
      <div className={style.messageInfo}>
        <div className={style.messageInfo_avata}>
          <img src={avatar} alt="" />
        
        </div>
      <div className="" style={{display:"flex",alignItems:"center",marginLeft:"5px",marginRight:"5px"}}>
        {(info && _id === roomState.owner) ? <img style={{width:"15px",height:"15px",borderRadius:"50%"}} src="https://www.pngitem.com/pimgs/m/34-347182_key-emoji-cutouts-key-emoji-transparent-hd-png.png" alt="" /> :""}
      </div>
        <div className={style.messageInfo_description}>
          <div
            className={style.messageInfo_description_name}
            style={info ? { height: "100%", lineHeight: "40px" } : {}}
          >
            {name}
          </div>
          {!info && (
            <div className={style.messageInfo_description_inner}>
              {messages}
            </div>
          )}
        </div>
      </div>
      

      <div className={style.message_time}>
        {info ? (
          permission ? <input name="permission" type={"radio"} onChange={() => addUser(_id)}></input> : <input type={"checkbox"} onChange={() => addUser(_id)}></input>
        ) : (
          <div className="">
            <div className={style.message_time_time}>{time}</div>
            <div className={style.message_time_more}>
              {/* <FiMoreHorizontal /> */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MesageItem;
