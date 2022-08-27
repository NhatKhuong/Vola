import { useState } from "react";
import style from "./Content.module.css";
import { AiFillEdit } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiNails } from "react-icons/gi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ImageGrid from "../common/ImageGrid";
import ExpandComponent from "../common/ExpandComponent";

function MenuContent() {
    return (
        <div className={style.menuContent}>
            <div className={style.menuContent_header}>
                <h3>Thông tin hội thoại</h3>
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
                        <div className={style.file}>
                            <img src="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" alt="" />
                            <div className={style.info}>
                                <div className={style.name}>Lab1.pdf</div>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
                        </div>
                        <div className={style.file}>
                            <img src="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" alt="" />
                            <div className={style.info}>
                                <div className={style.name}>Lab1.pdf</div>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
                        </div>
                        <div className={style.file}>
                            <img src="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" alt="" />
                            <div className={style.info}>
                                <div className={style.name}>Lab1.pdf</div>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
                        </div>
                        <div className={style.file}>
                            <img src="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" alt="" />
                            <div className={style.info}>
                                <div className={style.name}>Lab1.pdf</div>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
                        </div>
                     </div>
                </ExpandComponent>

                <ExpandComponent title="Links">
                    <div className={style.files}>
                        <div className={style.file}>
                            <img src="https://media.istockphoto.com/vectors/chain-link-line-icon-editable-stroke-pixel-perfect-for-mobile-and-web-vector-id1136358844?k=20&m=1136358844&s=170667a&w=0&h=3Bh5In5m9TBTZmQZanOIrul0hSVGDXTlUj8I2X-JfiU=" alt="" />
                            <div className={style.info}>
                                <a href="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" className={style.name}>https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ</a>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
                        </div>
                        <div className={style.file}>
                            <img src="https://media.istockphoto.com/vectors/chain-link-line-icon-editable-stroke-pixel-perfect-for-mobile-and-web-vector-id1136358844?k=20&m=1136358844&s=170667a&w=0&h=3Bh5In5m9TBTZmQZanOIrul0hSVGDXTlUj8I2X-JfiU=" alt="" />
                            <div className={style.info}>
                                <a href="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" className={style.name}>https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ</a>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
                        </div>
                        <div className={style.file}>
                            <img src="https://media.istockphoto.com/vectors/chain-link-line-icon-editable-stroke-pixel-perfect-for-mobile-and-web-vector-id1136358844?k=20&m=1136358844&s=170667a&w=0&h=3Bh5In5m9TBTZmQZanOIrul0hSVGDXTlUj8I2X-JfiU=" alt="" />
                            <div className={style.info}>
                                <a href="https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ" className={style.name}>https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ</a>
                                <div className={style.byte}>4KB</div>
                            </div>
                            <div className={style.date}>20/02/2022</div>
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
