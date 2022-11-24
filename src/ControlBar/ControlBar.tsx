import style from "./ControlBar.module.css";
import { RiMessage3Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { MdPermContactCalendar } from "react-icons/md";
import { AiFillCloud, AiOutlineSetting } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import {BiLogOut} from "react-icons/bi"
import tokenService from "../services/token.service";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import userAPI from "../redux/user/userAPI";
import { logout } from "../redux/user/slice";
import { newSocket } from "../App";


const ControlBar = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const handelLogout=()=>{
        tokenService.remove();
        dispatch(logout())
        navigate("/login");
        // newSocket.disconnect();

    }
    const userState = useAppSelector((state: any) => state.user);
    return (
        <div className={style.controlbar}>
            <div className={style.control_top}>
                <div className={style.control_top_item}>
                    <img src={userState.user.avatar} alt="" />
                </div>
                <div className={style.control_top_item}>
                    <RiMessage3Fill onClick={()=>navigate("/")}></RiMessage3Fill>
                </div>
                <div className={style.control_top_item}>
                    <MdPermContactCalendar onClick={()=>navigate("/manager")} />
                </div>
                <div className={style.control_top_item}>
                    <TbListDetails />
                </div>
            </div>
            <div className={style.control_bot}>
                <div className={style.control_top_item}>
                    <AiFillCloud />
                </div>
                <div className={style.control_top_item}>
                    <CgShoppingBag />
                </div>
                <div className={style.control_top_item}>
                    {/* <div style={{color:"#fff", border:"1px solid #fff", height:"30px", borderRadius:"5px", fontSize:"15px", backgroundColor:"red"}}>
                            LogOut
                    </div> */}
                    <BiLogOut onClick={handelLogout} />
                </div>
            </div>
        </div>
    );
};

export default ControlBar;
