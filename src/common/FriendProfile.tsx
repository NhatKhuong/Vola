/* eslint-disable jsx-a11y/alt-text */
import {useState} from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "../FreindList/MesageItem";
import style from "./FriendProfile.module.scss";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { closeModalProfile } from "../redux/statusCommon/slice";


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
        width: "350px",
        height: "75vh"
    },
};

function FriendProfile(prop:Prop) {
    const dispatch = useAppDispatch();
    const commonState = useAppSelector((state: any) => state.statusCommon);
    // const commonState =  useAppSelector((state: any) => state.statusCommon);
    
    // const [modalIsOpen, setIsOpen] = useState(false);
    return (
        <div>
            <ReactModal
                style={customStyles}
                isOpen={commonState.isOpenModalProfile}
                onRequestClose={()=>dispatch(closeModalProfile())}
            >
                <div className={style.Modal_friendProfile}>
            <div className={style.Modal_friendProfile_head}>
                <div className={style.Modal_friendProfile_head_title}>
                    Thông tin tài khoản
                </div>
                <div className={style.Modal_friendProfile_head_close}>
                    <IoMdClose onClick={()=>{dispatch(closeModalProfile())}} />
                </div>
            </div>
            <div className={style.Modal_friendProfile_body}>
                <div className={style.Modal_friendProfile_body_imgInfo}>
                    <img src="https://cover-talk.zadn.vn/default" alt="" />
                    <div className={style.Modal_friendProfile_body_imgInfo_avatar}>
                        <div className={style.img}>
                           <img src="https://zpsocial-f41-org.zadn.vn/6a650344d423387d6132.jpg"></img>
                        </div>  
                    </div>
                </div>
                <div className={style.Modal_friendProfile_body_imgInfo_name}>Huỳnh Võ Hoàng Long</div>
                <div className={style.Modal_friendProfile_body_imgInfo_btn}>
                    <button style={{backgroundColor:"#0068ff", color:"#fff", width:"110px", height:"25px", fontSize:"12px", borderRadius:"3px"}}>Gọi điện</button>
                    <button style={{backgroundColor:"#0068ff", color:"#fff", width:"110px", height:"25px", fontSize:"12px", borderRadius:"3px", marginLeft:"5px"}}>Nhắn tin</button>
                </div>
                <div className={style.Modal_friendProfile_body_imgInfo_text}>
                    <div style={{margin:"10px 0", fontWeight:"bold", fontSize:"13px"}}>Thông tin cá nhân</div>
                    <div className={style.Modal_friendProfile_body_imgInfo_text_phone}>
                        <div className={style.title}>Số điện thoại</div>
                        <div className={style.value}>0909878767</div>
                    </div>
                    <div className={style.Modal_friendProfile_body_imgInfo_text_sex}>
                    <div className={style.title}>Giới tính</div>
                        <div className={style.value}>Nam</div>
                    </div>
                    <div className={style.Modal_friendProfile_body_imgInfo_text_bornDate}>
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

export default FriendProfile;
