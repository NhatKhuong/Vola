import {useEffect} from "react";
import style from "./WindowChat.module.scss";
import clsx from "clsx";
import { BsTelephoneOutboundFill, BsTelephoneXFill } from "react-icons/bs";
import io, { Socket } from "socket.io-client";
import { useParams } from "react-router-dom";


function WindowChat() {
    const params = useParams();
    const otherUser = {
        fullName:"User1",
    }
    const newSocket = io("http://localhost:5001", {
        query: {
            // token: useState.accessToken,
        },
    });
    useEffect(() => {
        // if (frameUserIsOpen.current) {
            newSocket.emit("video chat", {
                roomID: params.roomID,
            });

            // frameUserIsOpen.current = false;
    
     
    }, [])
    
    return (
        <div
            className={clsx(style.video_chat)}
            style={{
                background: `url(https://play-lh.googleusercontent.com/wwzWuDb8ivbarUCpB7sEaUkx-vq6HbbqNZ2Eg5a_HpXNNyQpp-cFcNCcG-O9T28N8RLv)`,
            }}
        >
            {/* {!accept && userState.user._id === callerID.current && ( */}
                <div className={clsx(style.calling)}>
                    <div>{`Đang gọi ...`}</div>
                    <button>
                        <BsTelephoneXFill />
                    </button>
                </div>
            {/* )} */}
            {/* {!accept && userState.user._id === answerID.current && ( */}
                <div className={clsx(style.answer)}>
                    {otherUser ? (
                        <div>{otherUser.fullName}</div>
                    ) : (
                        <div>Đang gọi</div>
                    )}

                    <div className={clsx(style.action)}>
                        <button>
                            <BsTelephoneXFill />
                        </button>
                        <button
                            // onClick={handleAccept}
                            className={clsx(style.accept)}
                        >
                            <BsTelephoneOutboundFill />
                        </button>
                    </div>
                </div>
            {/* )} */}

            {/* {accept && (
                <div id="videos" className={clsx(style.videos)}>
                    {video.myVideo ? (
                        <video
                            autoPlay
                            ref={myVideo}
                            width="150"
                            height="100"
                            muted
                            className={clsx(style.myVideo)}
                        ></video>
                    ) : (
                        <img
                            className={clsx(style.my_image)}
                            src={
                                process.env.REACT_APP_URL +
                                "/static/avatar/" +
                                userState.user.avatar
                            }
                            alt=""
                        />
                    )}
                    {video.userVideo ? (
                        <video
                            autoPlay
                            ref={userVideo}
                            muted={mute.userMute}
                            className={clsx(style.userVideo)}
                        ></video>
                    ) : (
                        <img
                            className={clsx(style.user_image)}
                            src={
                                process.env.REACT_APP_URL +
                                "/static/avatar/" +
                                otherUser.avatar
                            }
                            alt=""
                        />
                    )}

                    <div className={clsx(style.action)}>
                        <div
                            className={clsx(style.video_off)}
                            onClick={closeConnect}
                        >
                            <BsTelephoneXFill />
                        </div>
                        <div className={clsx(style.mic)} onClick={handleMute}>
                            {mute.icon ? (
                                <BsFillMicMuteFill />
                            ) : (
                                <BsFillMicFill />
                            )}
                        </div>
                        <div
                            className={clsx(style.cam)}
                            onClick={turnOffOrOnMyVideo}
                        >
                            <BsCameraVideoFill />
                        </div>
                    </div>
                </div>
            )} */}
        </div>
    );
}

export default WindowChat;
