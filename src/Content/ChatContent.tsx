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

interface Props{
    showMenuChat:React.Dispatch<React.SetStateAction<boolean>>
}

function ChatContent(prop:Props) {
    const [value, setValue] = useState("")

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
                        <AiOutlineUsergroupAdd />
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
