import React from 'react'
import FriendList from './FriendList'
import Search from './Search'
import style from "./FreindList.module.css"


function FriendTag() {
  return (
    <div className={style.friednTag}>
        <Search />
        <FriendList />
        
    </div>
  )
}

export default FriendTag