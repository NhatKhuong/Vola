import React from 'react'
import style from "./Manager.module.css"

function GroupItem () {
  return (
    <div className={style.group_item}>
    <img style={{marginTop:"35px",width:"70px", height:"70px", objectFit:"cover", borderRadius:"50%"}} src="https://i.ex-cdn.com/phatgiao.org.vn/files/content/2022/08/29/avoiphatgiaoorgvn-2147.jpg" alt="" />
    <div style={{margin:"5px",fontSize:"16px", fontWeight:"bold"}}>Nhóm công nghệ mới</div>
    <div className={style.member} style={{fontSize:"14px", color:"#394e60"}}>100 thành viên</div>
  </div>
  )
}

export default GroupItem