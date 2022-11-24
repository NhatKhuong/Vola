import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import style from "./FreindList.module.css";
import { IoSearchOutline } from "react-icons/io5";
import { BiUserPlus } from "react-icons/bi";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FiMoreHorizontal } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "./MesageItem";
import { HiOutlineCamera } from "react-icons/hi";
import { FiSearch } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { oppenModal } from "../redux/statusCommon/slice";
import ModalCreateGroup from "../common/ModalCreateGroup";
const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "450px",
        height: "95vh",
    },
};

function Search() {
    const dispatch = useDispatch();
    // const [modalIsOpen, setIsOpen] = useState(false);
    // function openModal() {
    //     setIsOpen(true);
    // }

    // function closeModal() {
    //     setIsOpen(false);
    // }

    return (
        <div className={style.searchTag}>
            <div className={style.search}>
                <div className={style.search_block}>
                    <IoSearchOutline />
                    <input style={{width:"100px", fontSize:"14px"}} type="text" placeholder="Tìm kiếm" />
                </div>
                <div className={style.search_icon}>
                    <div className={style.search_icon_item}>
                        <BiUserPlus />
                    </div>
                    <div className={style.search_icon_item}>
                        <AiOutlineUsergroupAdd
                            onClick={() => dispatch(oppenModal())}
                        />
                        <ModalCreateGroup isShare={false} />
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
            <hr style={{margin:0}} />
        </div>
    );
}

export default Search;
