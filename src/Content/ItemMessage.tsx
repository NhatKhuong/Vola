import style from "./ItemMessage.module.css";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { TbArrowBackUp } from "react-icons/tb";
import { AiOutlineTransaction } from "react-icons/ai";
import { MdOutlineAddReaction } from "react-icons/md";

import { BiTransfer } from "react-icons/bi";
import tokenService from "../services/token.service";
import axios from "axios";
import { useAppSelector } from "../redux/hook";
import { useState } from "react";

interface Props {
    isMyMessage: boolean;
    name: string;
    message: string;
    time?: Date;
    avatar: string;
    type?: string;
    isOwner?: boolean;
    _id?: string;
    emoji?: string;
}
function ItemMessage(props: Props) {
    const accessToken = tokenService.getAccessToken();
    const roomState = useAppSelector((state) => state.room);
    const [icon, setIcon] = useState("")
    const onClickIcon = (e: any) => {
        console.log(e.target.innerText);
    }

    async function reactMessage(react: any) {
        // var result = await axios.post(`https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomState._id}/messages/${props._id}/react`,
        // {
        //     react:react
        // }).then(()=>{
        //     console.log("success");

        // }).catch((err)=>{
        //     console.log(err);

        // })
        axios({
            url: `https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomState._id}/messages/${props._id}/react`,
            method: "POST",
            headers: {
                authorization: accessToken as string
            },
            data: {
                react
            }
        }).then((respone) => {
            console.log(respone);

        }).catch((err) => {
            console.log(err);

        })
    }

    async function hadelUnMessage() {
        console.log(props._id);

        var user = await axios
            .delete(
                `https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomState._id}/messages/${props._id}`,
                {
                    headers: { authorization: accessToken as string },
                }
            )
            .then(() => {
                console.log("sucess");
            })
            .catch((err) => {
                console.log(err);
            });
    }
    const ComponentMessage = () => {
        if (props.type === "file") {
            var nameFile = props.message.split("___").at(-1);
            var typeName = nameFile?.split(".")[1];
            var urlPic: any;
            if (typeName === "pdf") {
                urlPic =
                    "https://play-lh.googleusercontent.com/kIwlXqs28otssKK_9AKwdkB6gouex_U2WmtLshTACnwIJuvOqVvJEzewpzuYBXwXQQ";
            } else if (typeName === "doc" || typeName === "docx") {
                urlPic =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/.docx_icon.svg/2048px-.docx_icon.svg.png";
            } else if (typeName === "xlsx") {
                urlPic =
                    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/.xlsx_icon.svg/2048px-.xlsx_icon.svg.png";
            } else if (typeName === "pptx") {
                urlPic =
                    "https://www.freeiconspng.com/thumbs/ppt-icon/powerpoint-icon-microsoft-powerpoint-icon-network-powerpoint-icons-and-3.png";
            }
            return (
                <div
                    className={
                        style.ItemMessage_content_mesage_message_container
                    }
                >
                    <div className={style.ItemMessage_content_mesage_message}>
                        {nameFile}
                    </div>
                    <img
                        className={style.ItemMessage_content_mesage_message_img}
                        onClick={() => {
                            window.open(
                                props.message,
                                "_blank",
                                "noopener,noreferrer"
                            );
                        }}
                        style={{ width: "30px", height: "30px" }}
                        src={urlPic}
                        alt=""
                    />
                </div>
            );
        } else if (props.type === "image") {
            return (
                <img
                    style={{
                        width: "300px",
                        objectFit: "contain",
                        maxHeight: "400px",
                    }}
                    loading="lazy"
                    src={props.message}
                    alt="Loading...."
                />
            );
        } else if (props.type === "unsend") {
            return (
                <div
                    className={style.ItemMessage_content_mesage_message_unsent}
                >
                    Tin nhắn đã được thu hồi
                </div>
            );
        } else
            return (
                <div className={style.ItemMessage_content_mesage_message}>
                    {props.message}
                </div>
            );
        // } else return <div></div>;
    };

    return (
        <div className={style.ItemMessage} style={{}}>
            <div className={style.ItemMessage_container}>
                {props.isMyMessage ? (

                    <div
                        className={style.ItemMessage_content}
                        style={{ justifyContent: "flex-end" }}
                    >
                        <div
                            className={
                                style.ItemMessage_content_mesage_expan_container
                            }
                        >
                            {props.type !== "unsend" ? (
                                <div
                                    className={
                                        style.ItemMessage_content_mesage_expan
                                    }
                                >
                                    <div
                                        onClick={() => hadelUnMessage()}
                                        className={
                                            style.ItemMessage_content_mesage_expan_thuhoi
                                        }
                                    >
                                        <TbArrowBackUp></TbArrowBackUp>
                                    </div>
                                    <div
                                        className={
                                            style.ItemMessage_content_mesage_expan_respone
                                        }
                                    >
                                        <BiTransfer></BiTransfer>
                                    </div>
                                    <div
                                        className={style.ItemMessage_content_mesage_expan_respone_react}
                                    >
                                        <MdOutlineAddReaction></MdOutlineAddReaction>
                                        <div className={style.ItemMessage_content_mesage_expan_respone_react_container}>
                                            <div className={style.reactIcon}>😍</div>
                                            <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😍</div>
                                            <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😑</div>
                                            <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😀</div>
                                            <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😭</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>

                        <div className={style.ItemMessage_content_mesage}>
                            <div className={style.reactIconMysefl}>{props.emoji}</div>
                            {/* 
                            <div
                                className={
                                    style.ItemMessage_content_mesage_name
                                }
                            >
                                {props.name}
                            </div> */}
                            <ComponentMessage />

                            <div
                                className={
                                    style.ItemMessage_content_mesage_time
                                }
                            >
                                12:30
                            </div>
                        </div>
                        <div className={style.ItemMessage_content_avatar}>
                            <img src={props.avatar} alt="" />
                            {props.isOwner ? (
                                <img
                                    style={{
                                        height: "20px",
                                        width: "20px",
                                        objectFit: "cover",
                                    }}
                                    src="https://www.pngitem.com/pimgs/m/34-347182_key-emoji-cutouts-key-emoji-transparent-hd-png.png"
                                    alt=""
                                />
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ) : (
                    <div className={style.ItemMessage_content}>
                        <div className={style.ItemMessage_content_avatar}>
                            {props.isOwner ? (
                                <img
                                    style={{
                                        height: "20px",
                                        width: "20px",
                                        objectFit: "cover",
                                    }}
                                    src="https://www.pngitem.com/pimgs/m/34-347182_key-emoji-cutouts-key-emoji-transparent-hd-png.png"
                                    alt=""
                                />
                            ) : (
                                ""
                            )}
                            <img src={props.avatar} alt="" />
                        </div>

                        <div className={style.ItemMessage_content_mesage}>
                            <div className={style.reactIconYousefl}>{props.emoji}</div>
                            <div
                                className={
                                    style.ItemMessage_content_mesage_name
                                }
                            >
                                {props.name}
                            </div>
                            {/* <div
                                className={style.ItemMessage_content_mesage_message}
                            >
                                {props.message}
                            </div> */}
                            <ComponentMessage />
                            <div
                                className={
                                    style.ItemMessage_content_mesage_time
                                }
                            >
                                13:09
                            </div>
                        </div>
                        <div
                            className={
                                style.ItemMessage_content_mesage_expan_container
                            }
                        >
                            <div
                                className={
                                    style.ItemMessage_content_mesage_expan
                                }
                            >
                                {/* <div onClick={()=>hadelUnMessage()} className={style.ItemMessage_content_mesage_expan_thuhoi}><TbArrowBackUp></TbArrowBackUp></div> */}
                                <div
                                    className={
                                        style.ItemMessage_content_mesage_expan_respone
                                    }
                                >
                                    <BiTransfer></BiTransfer>
                                </div>
                                <div
                                    className={style.ItemMessage_content_mesage_expan_respone_react}
                                >
                                    <MdOutlineAddReaction></MdOutlineAddReaction>
                                    <div className={style.ItemMessage_content_mesage_expan_respone_react_container_noMyself}>
                                        <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😍</div>
                                        <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😑</div>
                                        <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😀</div>
                                        <div onClick={(e: any) => reactMessage(e.currentTarget.textContent)} className={style.reactIcon}>😭</div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ItemMessage;
