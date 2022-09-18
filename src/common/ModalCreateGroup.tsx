import {useState} from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "../FreindList/MesageItem";
import style from "./ModalCreateGroup.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { closeModal } from "../redux/statusCommon/slice";

interface Prop{
    isShare:boolean
}

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

function ModalCreateGroup(prop:Prop) {
    const dispatch = useAppDispatch();
    const commonState = useAppSelector((state: any) => state.statusCommon);
    console.log(commonState.isOpenModal);
    
    // const [modalIsOpen, setIsOpen] = useState(false);

    return (
        <div>
            <ReactModal
                style={customStyles}
                isOpen={commonState.isOpenModal}
                onRequestClose={()=>dispatch(closeModal())}
            >
                <div className={style.Modal_createGroup}>
                    <div className={style.Modal_createGroup_head}>
                        <div className={style.Modal_createGroup_head_title}>
                            Tạo nhóm
                        </div>
                        <div className={style.Modal_createGroup_head_close}>
                            <IoMdClose onClick={()=>dispatch(closeModal())} />
                        </div>
                    </div>

                    <div className={style.Modal_createGroup_name_group}>
                        <div
                            className={
                                style.Modal_createGroup_name_group_iconBlock
                            }
                        >
                            <HiOutlineCamera />
                        </div>
                        <div
                            className={
                                style.Modal_createGroup_name_group_name_group
                            }
                        >
                            <input type="text" placeholder="Nhập tên nhóm..." />
                        </div>
                    </div>
                    <div className={style.add_group_title}>
                        Thêm bạn vào nhóm
                    </div>
                    <div className={style.search_menber_block}>
                        <div className={style.search_menber_icon}>
                            <FiSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập tên, số diện thoại, hoặc danh sách số điện thoại"
                        />
                    </div>
                    <hr />
                    <div className={style.add_group_title_chat_late}>
                        Trò chuyện gần đây
                    </div>
                    <div className={style.listMember}>
                        <MesageItem
                            avatar="https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                            name="Nhat Khuong"
                            message="Hello jjj"
                            time={new Date()}
                            info={true}
                        />
                        <MesageItem
                            avatar="https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                            name="Nhat Khuong"
                            message="Hello jjj"
                            time={new Date()}
                            info={true}
                        />
                        <MesageItem
                            avatar="https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                            name="Nhat Khuong"
                            message="Hello jjj"
                            time={new Date()}
                            info={true}
                        />
                        <MesageItem
                            avatar="https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                            name="Nhat Khuong"
                            message="Hello jjj"
                            time={new Date()}
                            info={true}
                        />
                        <MesageItem
                            avatar="https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                            name="Nhat Khuong"
                            message="Hello jjj"
                            time={new Date()}
                            info={true}
                        />
                        <MesageItem
                            avatar="https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"
                            name="Nhat Khuong"
                            message="Hello jjj"
                            time={new Date()}
                            info={true}
                        />
                    </div>
                    <div className={style.Modal_footer}>
                        <button className={style.btn_modal_cancel}>Hủy</button>
                        {/* <button className={style.btn_modal_create}>Tạo nhóm</button> */}
                        {
                            prop.isShare
                             ? 
                            <button className={style.btn_modal_create}>
                                Chia sẻ
                            </button>
                            :
                            <button className={style.btn_modal_create}>
                                Tạo nhóm
                            </button>
                        }
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ModalCreateGroup;
