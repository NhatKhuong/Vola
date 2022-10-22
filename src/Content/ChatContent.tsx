import React, { useEffect, useState } from "react";
import style from "./Content.module.css";
import { AiOutlineUser } from "react-icons/ai";
import { AiOutlineUsergroupAdd,AiOutlinePicture } from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlineTableRows } from "react-icons/md";
import { ImFilePicture } from "react-icons/im";
import ReactTooltip from "react-tooltip";
import { EmojiButton } from "@joeattardi/emoji-button";
import { VscReactions } from "react-icons/vsc";
import ItemMessage from "./ItemMessage";
import { inflate } from "zlib";
import { useDispatch } from "react-redux";
import { oppenModal } from "../redux/statusCommon/slice";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import roomAPI from "../redux/Room/roomAPI";
import io, { Socket } from "socket.io-client";
import {IoDocumentAttachOutline} from "react-icons/io5"

interface Props {
    showMenuChat: React.Dispatch<React.SetStateAction<boolean>>;
    socket?: any;
}

function ChatContent(prop: Props) {
    const dispatch = useDispatch<any>();
    const [value, setValue] = useState("");
    const roomState = useAppSelector((state: any) => state.room);
    const userState = useAppSelector((state: any) => state.user);
    const newSocket = io("http://localhost:5000", {
        query: {
            // token: useState.accessToken,
        },
    });

    const sendMessageSocket = () => {
        console.log("sendMessage");

        newSocket.emit("client-send-message", {
            token: userState.accessToken,
            roomId: roomState._id,
            content: value,
            type: "text",
        });
    };

    useEffect(() => {
        const picker = new EmojiButton();
        const trigger = document.querySelector("#emoji-trigger");

        picker.on("emoji", (selection) => {
            // handle the selected emoji here
            setValue((pre) => pre + selection.emoji);
        });

        (trigger as any).addEventListener("click", () =>
            picker.togglePicker(trigger as any)
        );
    }, []);

    const call = () => {
        const roomID = roomState._id;

        window.open(
            "/voice-chat/" +
                roomID +
                "/" +
                userState.user._id +
                "/" +
                roomState._id,
            "_blank",
            "location=yes,height=520,width=450,scrollbars=yes,status=yes"
        );
    };

    // sendMessageSocket

    return (
        <div className={style.chatContent}>
            <div className={style.chatContentHeader}>
                <div className={style.chatContentHeader_left}>
                    <img src={roomState.avatar} alt="" />
                    <div className={style.chatContentHeader_info}>
                        <div className={style.chatContentHeader_info_name}>
                            {roomState.name}
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
                        <AiOutlineUsergroupAdd
                            onClick={() => dispatch(oppenModal())}
                        />
                    </div>
                    <div className={style.chatContentHeader_right_item}>
                        <AiOutlineSearch />
                    </div>
                    <div className={style.chatContentHeader_right_item}>
                        <BsCameraVideo onClick={call}/>
                    </div>
                    <div
                        className={style.chatContentHeader_right_item}
                        onClick={() => prop.showMenuChat((pre) => !pre)}
                    >
                        <MdOutlineTableRows />
                    </div>
                </div>
            </div>
            <div className={style.chatContentWindow}>
                {roomState.lstChat.map((e: any) => {
                    console.log(e);
                    const isMyMessage =
                        e.user._id === userState.user._id ? true : false;
                    return (
                        <ItemMessage
                            isMyMessage={isMyMessage}
                            avatar={e.user.avatar}
                            name={e.user.name}
                            time={e.createdAt}
                            message={e.content}
                            type={e.type}
                        />
                    );
                })}
            </div>
            <div className={style.chatContentTool}>
                <div
                    data-tip="hello world"
                    className={style.chatContentTool_item}
                >
                    <AiOutlinePicture />
                </div>
                <div className={style.chatContentTool_item}>
                    <IoDocumentAttachOutline />
                </div>
               
            </div>
            <div className={style.chatContentInput}>
                <div className={style.chatContentInput_text}>
                    <input style={{fontSize:"14px"}}
                        type="text"
                        placeholder="Nhập @, tin nhắn tới bạn của bạn"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            console.log(
                                "chat====================================="
                            );
                            if (e.key === "Enter") {
                                console.log(value);

                                sendMessageSocket();

                                dispatch(roomAPI.updateSentMessage()(value));
                                console.log("nhan enter");
                                setValue("")
                            }
                        }}
                    />
                </div>
                <div className={style.chatContentInput_react}>
                    {/* <button id="emoji-trigger">Emoji</button> */}
                    <div className={style.action_default}>👍</div>
                    <VscReactions id="emoji-trigger" />
                </div>
            </div>
        </div>
    );
}

export default ChatContent;
