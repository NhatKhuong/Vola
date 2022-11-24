import React from "react";
import style from "./FreindList.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
// import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { useAppDispatch, useAppSelector } from "../redux/hook";
interface Props {
  avatar?: string;
  name?: string;
  messages?: string;
  time?: string;
  info: boolean;
  _id?: string;
  addUser?: any;
}
function UserItem({ avatar, name, messages, time, info, _id, addUser }: Props) {
  return (
    <div className={style.messageItem}>
      <div className={style.messageInfo}>
        <div className={style.messageInfo_avata}>
          <img src={avatar} alt="" />
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
          <input type={"checkbox"} onChange={() => addUser(_id)}></input>
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

export default UserItem;
