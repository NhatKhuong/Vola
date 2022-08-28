import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./FreindList.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { BiUserPlus } from "react-icons/bi";
import { AiOutlineUsergroupAdd, } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import {IoMdClose} from "react-icons/io"
import ReactModal from "react-modal";
import MesageItem from "./MesageItem";
import {HiOutlineCamera} from "react-icons/hi"
import {FiSearch} from "react-icons/fi"
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        height: "95vh"
    },
};

function Search() {
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={style.searchTag}>
            <div className={style.search}>
                <div className={style.search_block}>
                    <IoSearchOutline />
                    <input type="text" placeholder="Tìm kiếm" />
                </div>
                <div className={style.search_icon}>
                    <div className={style.search_icon_item}>
                        <BiUserPlus />
                    </div>
                    <div className={style.search_icon_item}>
                        <AiOutlineUsergroupAdd onClick={openModal}/>
                        <ReactModal style={customStyles} isOpen={modalIsOpen} onRequestClose={closeModal}>
                            <div className={style.Modal_createGroup}>
                                <div className={style.Modal_createGroup_head}>
                                    <div className={style.Modal_createGroup_head_title}>Tạo nhóm</div>
                                    <div className={style.Modal_createGroup_head_close}>
                                        <IoMdClose onClick={closeModal}/>
                                    </div>
                                </div>

                                <div className={style.Modal_createGroup_name_group}>
                                    <div className={style.Modal_createGroup_name_group_iconBlock}>
                                        <HiOutlineCamera />
                                    </div>
                                    <div className={style.Modal_createGroup_name_group_name_group}>
                                        <input type="text" placeholder="Nhập tên nhóm..." />
                                    </div>
                                </div>
                                <div className={style.add_group_title}>Thêm bạn vào nhóm</div>
                                <div className={style.search_menber_block}>
                                    <div className={style.search_menber_icon}>
                                        <FiSearch />
                                    </div>
                                    <input type="text" placeholder="Nhập tên, số diện thoại, hoặc danh sách số điện thoại" />
                                </div>
                                <hr />
                                <div className={style.add_group_title_chat_late}>Trò chuyện gần đây</div>
                                <div className={style.listMember}>
                                    <MesageItem
                                        avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
                                        name='Nhat Khuong'
                                        message='Hello jjj'
                                        time={new Date()}
                                        info={true}
                                    />
                                    <MesageItem
                                        avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
                                        name='Nhat Khuong'
                                        message='Hello jjj'
                                        time={new Date()}
                                        info={true}
                                    />
                                    <MesageItem
                                        avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
                                        name='Nhat Khuong'
                                        message='Hello jjj'
                                        time={new Date()}
                                        info={true}
                                    />
                                    <MesageItem
                                        avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
                                        name='Nhat Khuong'
                                        message='Hello jjj'
                                        time={new Date()}
                                        info={true}
                                    />
                                    <MesageItem
                                        avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
                                        name='Nhat Khuong'
                                        message='Hello jjj'
                                        time={new Date()}
                                        info={true}
                                    />
                                    <MesageItem
                                        avatar='https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg'
                                        name='Nhat Khuong'
                                        message='Hello jjj'
                                        time={new Date()}
                                        info={true}
                                    />
                                </div>
                                <div className={style.Modal_footer}>
                                    <button className={style.btn_modal_cancel}>Hủy</button>
                                    <button className={style.btn_modal_create}>Tạo nhóm</button>
                                </div>
                            </div>
                        </ReactModal>
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
                            <option value="" selected disabled hidden>
                                Phân loại
                            </option>
                            <option value="">Tin nhắn từ người lạ</option>
                            <option value="">Quản lý phân loại</option>
                        </select>
                    </div>
                    <div className={style.filter_more}>
                        <FiMoreHorizontal />
                    </div>
                </div>
            </div>
            <hr />
        </div>
    );
}

export default Search;
