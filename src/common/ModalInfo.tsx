import React from "react";
import style from "./ModalInfo.module.css";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { oppenModalInfo, closeModalInfo } from "../redux/statusCommon/slice";
import { info } from "console";
import tokenService from "../services/token.service";
import axios from "axios";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        height: "65vh",
    },
};

function ModalInfo() {
    const dispatch = useAppDispatch();
    const statusState = useAppSelector((state: any) => state.statusCommon);
    const infoState = useAppSelector((state: any) => state.info);
    const token = tokenService.getAccessToken();
    console.log(statusState.isOpenModalInfo);

    const handelAddFriend = () => {
        axios
            .post(
                `https://frozen-caverns-53350.herokuapp.com/api/users/invites`,
                {
                    userId: infoState._id,
                },
                {
                    headers: { authorization: token as string },
                }
            )
            .then((r: any) => {
                console.log("done");

                dispatch(closeModalInfo());
            })
            .catch((err) => {
                console.log(err);
            });
    };
    return (
        <div>
            <ReactModal
                style={customStyles}
                isOpen={statusState.isOpenModalInfo}
                onRequestClose={() => {
                    dispatch(closeModalInfo());
                }}
            >
                <div className={style.Modal_createGroup}>
                    <h1>{statusState.isOpenModalInfo}</h1>
                    <div className={style.Modal_createGroup_head}>
                        <div className={style.Modal_createGroup_head_title}>
                            Thông tin tài khoản
                        </div>
                        <div className={style.Modal_createGroup_head_close}>
                            <IoMdClose
                                onClick={() => {
                                    dispatch(closeModalInfo());
                                }}
                            />
                        </div>
                    </div>
                    <div className={style.Modal_createGroup_body}>
                        <div className={style.Modal_createGroup_body_imgInfo}>
                            <img
                                src="https://cover-talk.zadn.vn/default"
                                alt=""
                            />
                            <div
                                className={
                                    style.Modal_createGroup_body_imgInfo_avatar
                                }
                            >
                                <img src={infoState.avatar} alt="" />
                            </div>
                        </div>
                        <div
                            className={
                                style.Modal_createGroup_body_imgInfo_name
                            }
                        >
                            Trần Tấn Phước
                        </div>
                        <div
                            className={style.Modal_createGroup_body_imgInfo_btn}
                        >
                            <button
                                style={{
                                    backgroundColor: "#0068ff",
                                    color: "#fff",
                                    width: "100px",
                                    height: "26px",
                                    fontSize: "12px",
                                    borderRadius: "3px",
                                }}
                                onClick={handelAddFriend}
                            >
                                Kết bạn
                            </button>
                            <button
                                style={{
                                    backgroundColor: "#0068ff",
                                    color: "#fff",
                                    width: "100px",
                                    height: "26px",
                                    fontSize: "12px",
                                    borderRadius: "3px",
                                    marginLeft: "20px",
                                }}
                            >
                                Nhắn tin
                            </button>
                        </div>
                        <div
                            className={
                                style.Modal_createGroup_body_imgInfo_text
                            }
                        >
                            <div
                                style={{
                                    margin: "10px 0",
                                    fontWeight: "bold",
                                    fontSize: "13px",
                                }}
                            >
                                Thông tin cá nhân
                            </div>
                            <div
                                className={
                                    style.Modal_createGroup_body_imgInfo_text_phone
                                }
                            >
                                <div className={style.title}>Email</div>
                                <div className={style.value}>
                                    {infoState.email}
                                </div>
                            </div>
                            <div
                                className={
                                    style.Modal_createGroup_body_imgInfo_text_sex
                                }
                            >
                                <div className={style.title}>Giới tính</div>
                                <div className={style.value}>Nam</div>
                            </div>
                            <div
                                className={
                                    style.Modal_createGroup_body_imgInfo_text_bornDate
                                }
                            >
                                <div className={style.title}>Ngày sinh</div>
                                <div className={style.value}>01/01/2001</div>
                            </div>
                        </div>
                    </div>

                    <div className=""></div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ModalInfo;
