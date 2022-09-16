import React, { useEffect, useState } from "react";
import style from "./Content.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlineTableRows } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import { EmojiButton } from "@joeattardi/emoji-button";
import {VscReactions} from "react-icons/vsc"
import ItemMessage from "./ItemMessage";
import { inflate } from "zlib";
import { HiOutlineCamera } from "react-icons/hi";
import ReactModal from "react-modal";
import { IoMdClose } from "react-icons/io";
import { FiSearch } from "react-icons/fi";
import MesageItem from "../FreindList/MesageItem";

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
interface Props{
    showMenuChat:React.Dispatch<React.SetStateAction<boolean>>
}

function ChatContent(prop:Props) {
    const [value, setValue] = useState("")
    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    useEffect(() => {
        const picker = new EmojiButton();
        const trigger = document.querySelector("#emoji-trigger");

        picker.on("emoji", (selection) => {
            // handle the selected emoji here
            setValue(pre=>pre+selection.emoji)
        });

        (trigger as any).addEventListener("click", () =>
            picker.togglePicker(trigger as any)
        );
    }, []);

    return (
        <div className={style.chatContent}>
            <div className={style.chatContentHeader}>
                <div className={style.chatContentHeader_left}>
                    <img
                        src="https://i.pinimg.com/564x/7b/9e/5d/7b9e5d1749841f8fe18d9885eaa622b0.jpg"
                        alt=""
                    />
                    <div className={style.chatContentHeader_info}>
                        <div className={style.chatContentHeader_info_name}>
                            IUH Group
                        </div>
                        <div className={style.chatContentHeader_info_menber}>
                            <AiOutlineUser />
                            <div
                                className={
                                    style.chatContentHeader_info_number_member
                                }
                            >
                                71 Thành viên
                            </div>
                        </div>
                    </div>
                </div>
                <div className={style.chatContentHeader_right}>
                    <div className={style.chatContentHeader_right_item}>
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
                    <div className={style.chatContentHeader_right_item}>
                        <AiOutlineSearch />
                    </div>
                    <div className={style.chatContentHeader_right_item}>
                        <BsCameraVideo />
                    </div>
                    <div className={style.chatContentHeader_right_item} onClick={()=>prop.showMenuChat(pre=>!pre)}>
                        <MdOutlineTableRows />
                    </div>
                </div>
            </div>
            <div className={style.chatContentWindow}>
                < ItemMessage isMyMessage = {false}/>
                < ItemMessage isMyMessage = {true}/>
                < ItemMessage isMyMessage = {false}/>
                < ItemMessage isMyMessage = {true}/>
                < ItemMessage isMyMessage = {true}/>
                < ItemMessage isMyMessage = {true}/>
                < ItemMessage isMyMessage = {true}/>
                < ItemMessage isMyMessage = {true}/>
            </div>
            <div className={style.chatContentTool}>
                <div
                    data-tip="hello world"
                    className={style.chatContentTool_item}
                >
                    <ImFilePicture />
                </div>
                <div className={style.chatContentTool_item}>
                    <ImFilePicture />
                </div>
                <div className={style.chatContentTool_item}>
                    <ImFilePicture />
                </div>
                <div className={style.chatContentTool_item}>
                    <ImFilePicture />
                </div>
            </div>
            <div className={style.chatContentInput}>
                <div className={style.chatContentInput_text}>
                    <input
                        type="text"
                        placeholder="Nhập @, tin nhắn tới bạn của bạn"
                        value={value}
                        onChange={(e)=>{setValue(e.target.value)}}
                    />
                </div>
                <div className={style.chatContentInput_react}>
                    {/* <button id="emoji-trigger">Emoji</button> */}
                    <div className={style.action_default}>👍</div>
                    <VscReactions id="emoji-trigger"/>
                </div>
            </div>
        </div>
    );
}

export default ChatContent;
