import React from 'react'
import style from './ItemMessage.module.css'

interface Props{
    isMyMessage:boolean
}

function ItemMessage(props:Props) {

  return (
    <div className={style.ItemMessage} style={{}}>
        {props.isMyMessage ? 
            <div className={style.ItemMessage_content} style={{justifyContent: "flex-end"}}>
                <div className={style.ItemMessage_content_mesage}>
                    <div className={style.ItemMessage_content_mesage_name}>Đặng Nhật Khương</div>
                    <div className={style.ItemMessage_content_mesage_message}>Hello Đặng Nhật Khương.</div>
                    <div className={style.ItemMessage_content_mesage_time}>13:09</div>
                </div>
                <div className={style.ItemMessage_content_avatar}>
                    <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet-700x695.jpg" alt="" />
                </div>
            </div>
            :
            <div className={style.ItemMessage_content}>
                <div className={style.ItemMessage_content_avatar}>
                    <img src="https://kynguyenlamdep.com/wp-content/uploads/2022/06/avatar-cute-meo-con-than-chet-700x695.jpg" alt="" />
                </div>
                <div className={style.ItemMessage_content_mesage}>
                    <div className={style.ItemMessage_content_mesage_name}>Đặng Nhật Khương</div>
                    <div className={style.ItemMessage_content_mesage_message}>Hello Đặng Nhật Khương.</div>
                    <div className={style.ItemMessage_content_mesage_time}>13:09</div>
                </div>
            </div>
        }
    </div>
  )
}

export default ItemMessage