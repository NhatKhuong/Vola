import { useState } from "react";
import style from "./Content.module.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiNails } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ImageGrid from "../common/ImageGrid";
import ExpandComponent from "../common/ExpandComponent";
import ItemFileLink from "./ItemFileLink";
import {RiDeleteBin6Line} from "react-icons/ri"
import {CgDanger} from "react-icons/cg"

function MenuContent() {
    return (
        <div className={style.menuContent}>
            <div className={style.menuContent_header}>
                <h5 style={{textAlign:"center", alignItems:"center", width:"100%", height:"100%",lineHeight:"70px"}}>Thông tin hội thoại</h5>
            </div>
            <div className={style.menuContent_body}>
                <div className={style.menuContent_header_info}>
                    <img
                        src="https://anhdephd.vn/wp-content/uploads/2022/04/hinh-nen-gai-xinh.jpg"
                        alt=""
                    />
                    <div className={style.name}>
                        Khương
                        <AiFillEdit />
                    </div>
                    <div className={style.menuContent_header_info_listAction}>
                        <div
                            className={
                                style.menuContent_header_info_listAction_item
                            }
                        >
                            <IoMdNotificationsOutline />
                            <p
                                className={
                                    style.menuContent_header_info_listAction_item_name
                                }
                            >
                                Tắc thông báo
                            </p>
                        </div>
                        <div
                            className={
                                style.menuContent_header_info_listAction_item
                            }
                        >
                            <GiNails />
                            <p
                                className={
                                    style.menuContent_header_info_listAction_item_name
                                }
                            >
                                Ghim hội thoại
                            </p>
                        </div>
                        <div
                            className={
                                style.menuContent_header_info_listAction_item
                            }
                        >
                            <AiOutlineUsergroupAdd />
                            <p
                                className={
                                    style.menuContent_header_info_listAction_item_name
                                }
                            >
                                Tạo nhóm trò chuyện
                            </p>
                        </div>
                    </div>
                </div>

                <ExpandComponent title="Ảnh/Video">
                    <div className={style.images}>
                        <ImageGrid
                            images={[
                                "https://photo-cms-kienthuc.zadn.vn/zoom/800/uploaded/thutrang/2020_11_24/2/dang-chuan-mat-dep-gai-xinh-ha-thanh-khien-dan-tinh-xao-xuyen.jpg",
                                "https://media.baodautu.vn/Images/chicuong/2019/07/27/mvl7y4jk.jpg",
                                "https://viettelhochiminh.com.vn/wp-content/uploads/2022/05/hinh-anh-gai-xinh-nhat-ban-11.jpg",
                                "https://kenh14cdn.com/2020/9/27/img3814-16008495660052057963035-16012244314321556076455.jpg",
                                "https://media.baodautu.vn/Images/chicuong/2019/07/27/mvl7y4jk.jpg",
                                "https://viettelhochiminh.com.vn/wp-content/uploads/2022/05/hinh-anh-gai-xinh-nhat-ban-11.jpg",
                                "https://kenh14cdn.com/2020/9/27/img3814-16008495660052057963035-16012244314321556076455.jpg",
                            ]}
                        />
                    </div>
                </ExpandComponent>

                <ExpandComponent title="Files">
                    <div className={style.files}>
                        <ItemFileLink 
                            avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
                            name="File PDF"
                            discription="4KB"
                            time={new Date()}
                            isFile={true}
                        />
                        <ItemFileLink 
                            avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
                            name="File PDF"
                            discription="4KB"
                            time={new Date()}
                            isFile={true}
                        />
                        <ItemFileLink 
                            avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
                            name="File PDF"
                            discription="4KB"
                            time={new Date()}
                            isFile={true}
                        />
                        <ItemFileLink 
                            avatar="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ"
                            name="File PDF"
                            discription="4KB"
                            time={new Date()}
                            isFile={true}
                        />
                     </div>
                </ExpandComponent>

                <ExpandComponent title="Links">
                    <div className={style.files}>
                        <ItemFileLink 
                            avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            discription="4KB"
                            time={new Date()}
                            isFile={false}
                        />
                        <ItemFileLink 
                            avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            discription="4KB"
                            time={new Date()}
                            isFile={false}
                        />
                        <ItemFileLink 
                            avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            discription="4KB"
                            time={new Date()}
                            isFile={false}
                        />
                        <ItemFileLink 
                            avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            discription="4KB"
                            time={new Date()}
                            isFile={false}
                        />
                        <ItemFileLink 
                            avatar="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            name="https://png.pngtree.com/element_our/20190529/ourmid/pngtree-link-icon-image_1197618.jpg"
                            discription="4KB"
                            time={new Date()}
                            isFile={false}
                        />
                     </div>
                </ExpandComponent>
                <ExpandComponent title="Thiết lập bảo mật">
                    <div className={style.funtions}>
                        <div className={style.funtion_item}>
                            <div className={style.funtion_item_icon}>
                                <RiDeleteBin6Line />
                            </div>
                            <div className={style.funtion_item_name}>Xóa lịch sử trò chuyện</div>
                        </div>

                        <div className={style.funtion_item}>
                            <div className={style.funtion_item_icon}>
                                <CgDanger />
                            </div>
                            <div className={style.funtion_item_name}>Chặn</div>
                        </div>
                    </div>
                </ExpandComponent>


                <div className={style.menuContent_file}></div>
                <div className={style.menuContent_link}></div>
                <div className={style.menuContent_setting}></div>
            </div>
        </div>
    );
}

export default MenuContent;
