import {useState} from 'react'
import style from "./Manager.module.css"
import Search from '../FreindList/Search'
import {AiOutlineUserAdd} from "react-icons/ai"
import RequestAddFriendItem from './RequestAddFriendItem'
import GroupItem from './GroupItem'

function Manager() {
  const [isRequestAddFriend, setisRequestAddFriend] = useState(true);
  return (
    <div className={style.container}>
      <div className={style.left}>
        <Search />
        <div className={style.addFriendByPhhoneNumber}>
          <AiOutlineUserAdd />
          <div style={{fontSize:"14px", marginLeft:"10px"}}>Thêm bạn bằng số điện thoại</div>
        </div>
        <div className={style.itemComponent} onClick={()=>setisRequestAddFriend(true)}>
          <div className={style.image}>
            <img src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png" alt="" />
          </div>
          <div style={{fontSize:"14px"}}>Danh sách kết bạn</div>
        </div>
        <div className={style.itemComponent} onClick={()=>setisRequestAddFriend(false)}>
          <div className={style.image}>
            <img src="https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png" alt="" />
          </div>
          <div style={{fontSize:"14px"}}>Danh sách nhóm</div>
        </div>
      </div>
      <div className={style.right}>
        {isRequestAddFriend ? 
        (<div className={style.listRequestAddFriend}>
        <div className={style.listRequestAddFriend_header}>
          <div className={style.listRequestAddFriend_header_img}>
            <img src="https://chat.zalo.me/assets/NewFr@2x.820483766abed8ab03205b8e4a8b105b.png" alt="" />
          </div>
          <div className={style.listRequestAddFriend_header_title}>Danh sách lời mời kết bạn</div>
        </div>

        <div style={{fontSize:"14px", margin:"10px", fontWeight:"bold"}}>Lời mời kết bạn (1)</div>
        <div className={style.listRequestAddFriend_container}>
          <RequestAddFriendItem />
          <RequestAddFriendItem />
          <RequestAddFriendItem />
          <RequestAddFriendItem />
        
        </div>
      </div>)
        :
        (<div className={style.listRequestAddFriend}>
          <div className={style.listRequestAddFriend_header}>
            <div className={style.listRequestAddFriend_header_img}>
              <img src="https://chat.zalo.me/assets/group@2x.2d184edd797db8782baa0d5c7a786ba0.png" alt="" />
            </div>
            <div className={style.listRequestAddFriend_header_title}>Danh sách nhóm</div>
          </div>

          <div style={{fontSize:"14px", margin:"10px", fontWeight:"bold"}}>Số lượng nhóm (1)</div>
          <div className={style.listRequestAddFriend_container}>
            <div className={style.group_container}>
              <GroupItem />
              <GroupItem />
              <GroupItem />
              <GroupItem />
              <GroupItem />
              <GroupItem />
              <GroupItem />
            </div>
          </div>
        </div>)
        }
      </div>
    </div>
  )
}

export default Manager