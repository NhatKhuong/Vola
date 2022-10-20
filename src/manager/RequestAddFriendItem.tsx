import React from 'react'
import style from "./Manager.module.css"

function RequestAddFriendItem() {
  return (
    <div className={style.listRequestAddFriend_item}>
    <div className={style.listRequestAddFriend_item_info}>
      <div className={style.listRequestAddFriend_item_img}>
        <img src="https://s240-ava-talk.zadn.vn/1/b/5/5/8/240/28bf23f3da7f309e4911f798ea3c0184.jpg" alt="" />
      </div>
      <div style={{fontSize:"14px"}}>Trần Phúc Tông</div>
    </div>
    <div className={style.listRequestAddFriend_item_btn}>
      <button style={{width:"100px",fontSize:"14px",borderRadius:"5px",height:"30px", border:"1px solid #ccc"}}>Từ chối</button>
      <button style={{marginLeft:"10px",width:"100px",fontSize:"14px",borderRadius:"5px",height:"30px", border:"1px solid #ccc", backgroundColor:"#0068ff", color:"#fff"}}>Chấp nhận</button>
    </div>
  </div>
  )
}

export default RequestAddFriendItem