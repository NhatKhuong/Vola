import React from "react";
import style from "./FreindList.module.css";
import { FiMoreHorizontal } from "react-icons/fi";
interface Props {
    avatar: string;
    name: string;
    message: string;
    time?: Date;
}
function MesageItem({ avatar, name, message, time }: Props) {
    return (
        <div className={style.messageItem}>
            <div className={style.messageInfo}>
                <div className={style.messageInfo_avata}>
                    <img src={avatar} alt="" />
                </div>
                <div className={style.messageInfo_description}>
                    <div className={style.messageInfo_description_name}>
                        {name}
                    </div>
                    <div className={style.messageInfo_description_inner}>
                        {message}
                    </div>
                </div>
            </div>
            <div className={style.message_time}>
                <div className={style.message_time_time}>{} Giờ</div>
                <div className={style.message_time_more}>
                    <FiMoreHorizontal />
                </div>
            </div>
        </div>
    );
}

export default MesageItem;
