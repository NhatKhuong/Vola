import React from 'react'
import style from "./FreindList.module.css" 
import {IoSearchOutline} from "react-icons/io5"
import {BiUserPlus} from "react-icons/bi"
import {AiOutlineUsergroupAdd} from "react-icons/ai"
import {FiMoreHorizontal} from "react-icons/fi"

function Search() {
  return (
    <div className={style.searchTag}>
        <div className={style.search}>
            <div className={style.search_block}>
                <IoSearchOutline /> 
                <input type="text" placeholder='Tìm kiếm' />
            </div>
            <div className={style.search_icon}>
                <div className={style.search_icon_item}>
                    <BiUserPlus />
                </div>
                <div className={style.search_icon_item}>
                    <AiOutlineUsergroupAdd />
                </div>
            </div>
        </div>
        <div className={style.searchTab}>
            <div className={style.tab}>
                <div className={style.tab_item}>Tất cả</div>
                <div className={style.tab_item}>Chưa đọc</div>
            </div>
            <div className={style.filter}>
                <div className={style.filter_dropList}>
                    <select name="" id="">
                        <option value="" selected disabled hidden>Phân loại</option>
                        <option value="">Tin nhắn từ người lạ</option>
                        <option value="">Quản lý phân loại</option>
                    </select>
                </div>
                <div className={style.filter_more}>
                    <FiMoreHorizontal />
                </div>
            </div>
        </div>
        <hr/>
    </div>
  )
}

export default Search