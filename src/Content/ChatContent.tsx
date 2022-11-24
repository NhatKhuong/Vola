import React, { useEffect, useRef, useState } from "react";
import style from "./Content.module.css";
import { AiOutlineUser } from "react-icons/ai";
import {
    AiOutlineUsergroupAdd,
    AiOutlinePicture,
    AiFillDelete,
} from "react-icons/ai";
import { AiOutlineSearch } from "react-icons/ai";
import { BsCameraVideo } from "react-icons/bs";
import { MdOutlineTableRows } from "react-icons/md";
import { EmojiButton } from "@joeattardi/emoji-button";
import { VscReactions } from "react-icons/vsc";
import ItemMessage from "./ItemMessage";
import { useDispatch } from "react-redux";
import { oppenModal } from "../redux/statusCommon/slice";
import { useAppSelector, useAppDispatch } from "../redux/hook";
import roomAPI from "../redux/Room/roomAPI";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { newSocket } from "../App";
import axios from "axios";
import tokenService from "../services/token.service";
const urlUploadFile = "https://frozen-caverns-53350.herokuapp.com/api/storages/upload";

interface Props {
    showMenuChat: React.Dispatch<React.SetStateAction<boolean>>;
    socket?: any;
}

function ChatContent(prop: Props) {
    const token = tokenService.getAccessToken();
    const dispatch = useDispatch<any>();
    const [value, setValue] = useState("");
    const roomState = useAppSelector((state: any) => state.room);
    const userState = useAppSelector((state: any) => state.user);
    const [file, setFile] = React.useState();
    const fileInput = useRef(null);
    const elementListChat = useRef(null);
    const [preview, setPreview] = useState<any>();
    // const isOwner = roomState.owner === userState.user._id;

    const sendMessageSocket = () => {
        if (file) {
            let formData = new FormData();
            formData.append("file", file);
            setFile(undefined); // set empty

            axios
                .post(urlUploadFile, formData, {
                    headers: {
                        authorization: token!,
                        "Content-type": "multipart/form-data",
                    },
                })
                .then((res) => {
                    newSocket.emit("client-send-message", {
                        token: userState.accessToken,
                        roomId: roomState._id,
                        content: res.data.url,
                        type: res.data.type,
                    });
                })
                .catch((err) => {
                    console.log(err);
                    alert("Error Upload file");
                });
        }
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

    // files
    function handleUpload(event: any) {
        setFile(event.target.files[0]);
        
        
    }
    const clickUploadFile = () => {
        (fileInput.current as any).value = null;
        (fileInput.current as any).click();
    };
    // select file
    useEffect(() => {
        console.log(file);
        if (!file) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl);
    }, [file]);
    useEffect(() => {
        // scoll end page
        (elementListChat.current as any).scrollTop = (
            elementListChat.current as any
        ).scrollHeight;
    });
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
                                3 Thành viên
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
                        <BsCameraVideo onClick={call} />
                    </div>
                    <div
                        className={style.chatContentHeader_right_item}
                        onClick={() => prop.showMenuChat((pre) => !pre)}
                    >
                        <MdOutlineTableRows />
                    </div>
                </div>
            </div>
            <div className={style.chatContentWindow} ref={elementListChat}>
                {roomState.lstChat.map((e: any) => {
                    const isOwner =  e.user._id === roomState.owner ? true : false;
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
                            isOwner={isOwner}
                        />
                    );
                })}
            </div>
            <div className={style.previews}>
                {preview && (
                    <div className={style.preview}>
                        <AiFillDelete
                            color="#ff0000b3"
                            className={style.preview_delete}
                            onClick={() => {
                                setFile(undefined);
                            }}
                        />
                        <img src={preview} alt="" />
                    </div>
                )}
            </div>
            <div className={style.chatContentTool}>
                <div
                    data-tip="hello world"
                    className={style.chatContentTool_item}
                >
                    <AiOutlinePicture onClick={clickUploadFile} />
                    <input
                        hidden
                        ref={fileInput}
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                    />
                </div>
                <div className={style.chatContentTool_item}>
                    <IoDocumentAttachOutline />
                </div>
            </div>
            <div className={style.chatContentInput}>
                <div className={style.chatContentInput_text}>
                    <input
                        style={{ fontSize: "14px" }}
                        type="text"
                        placeholder="Nhập @, tin nhắn tới bạn của bạn"
                        value={value}
                        onChange={(e) => {
                            setValue(e.target.value);
                        }}
                        onKeyUp={(e) => {
                            if (e.key === "Enter") {
                                sendMessageSocket();
                                dispatch(roomAPI.updateSentMessage()(value));
                                setValue("");
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
