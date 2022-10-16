import React from 'react'
import style from "./ModalInfo.module.css"
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import { useAppDispatch, useAppSelector } from '../redux/hook';
import { oppenModalInfo,closeModalInfo } from "../redux/statusCommon/slice";

const customStyles = {
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
        width: "350px",
        height: "65vh"
    },
};

function ModalInfo() {
    const dispatch = useAppDispatch();
    const statusState = useAppSelector((state:any)=>state.statusCommon);
  return (
    <div>
    <ReactModal
        style={customStyles}
        isOpen={statusState.isOpenModalInfo}
        onRequestClose={()=>{dispatch(closeModalInfo())}}
    >
        <div className={style.Modal_createGroup}>
            <div className={style.Modal_createGroup_head}>
                <div className={style.Modal_createGroup_head_title}>
                    Thông tin tài khoản
                </div>
                <div className={style.Modal_createGroup_head_close}>
                    <IoMdClose onClick={()=>{dispatch(closeModalInfo())}} />
                </div>
            </div>
            <div className={style.Modal_createGroup_body}>
                <div className={style.Modal_createGroup_body_imgInfo}>
                    <img src="https://cover-talk.zadn.vn/default" alt="" />
                    <div className={style.Modal_createGroup_body_imgInfo_avatar}>
                        <img src="https://s120-ava-talk.zadn.vn/0/2/6/2/19/120/6ada7c4e75a5afcba4feae303bc43acf.jpg" alt="" />
                    </div>
                </div>
                <div className={style.Modal_createGroup_body_imgInfo_name}>Trần Tấn Phước</div>
                <div className={style.Modal_createGroup_body_imgInfo_btn}>
                    <button style={{backgroundColor:"#0068ff", color:"#fff", width:"100px", height:"26px", fontSize:"12px", borderRadius:"3px"}}>Kết bạn</button>
                    <button style={{backgroundColor:"#0068ff", color:"#fff", width:"100px", height:"26px", fontSize:"12px", borderRadius:"3px", marginLeft:"20px"}}>Nhắn tin</button>
                </div>
                <div className={style.Modal_createGroup_body_imgInfo_text}>
                    <div style={{margin:"10px 0", fontWeight:"bold", fontSize:"13px"}}>Thông tin cá nhân</div>
                    <div className={style.Modal_createGroup_body_imgInfo_text_phone}>
                        <div className={style.title}>Số điện thoại</div>
                        <div className={style.value}>0909878767</div>
                    </div>
                    <div className={style.Modal_createGroup_body_imgInfo_text_sex}>
                    <div className={style.title}>Giới tính</div>
                        <div className={style.value}>Nam</div>
                    </div>
                    <div className={style.Modal_createGroup_body_imgInfo_text_bornDate}>
                    <div className={style.title}>Ngày sinh</div>
                        <div className={style.value}>01/01/2001</div>
                    </div>
                </div>
                
            </div>
           
            <div className=""></div>
        </div>
    </ReactModal>
</div>
  )
}

export default ModalInfo