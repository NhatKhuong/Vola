import React from "react";
import style from "./FreindList.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
interface Props {
    avatar?: string;
    name?: string;
    message?: string;
    time?: string;
    info:boolean;
}
function MesageItem({ avatar, name, message, time,info }: Props) {
    return (
        <div className={style.messageItem} >
            <div className={style.messageInfo}>
                <div className={style.messageInfo_avata}>
                    <img src={avatar} alt="" />
                </div>
                <div className={style.messageInfo_description}>
                    <div className={style.messageInfo_description_name} style={info ? {height:"100%",lineHeight:"40px"}: {}}>
                        {name}
                    </div> 
                    {(!info) && <div className={style.messageInfo_description_inner}>{message}</div>}  
                </div>
            </div>
            <div className={style.message_time}>
                {info ? <input type={"checkbox"}></input> 
                :
                <div className="">        
                    <div className={style.message_time_time}>{time} Giờ</div>
                    <div className={style.message_time_more}>
                        <FiMoreHorizontal />
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default MesageItem;
