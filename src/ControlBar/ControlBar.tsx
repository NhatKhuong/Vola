import style from "./ControlBar.module.css";
import { RiMessage3Fill } from "react-icons/ri";
import { TbListDetails } from "react-icons/tb";
import { MdPermContactCalendar } from "react-icons/md";
import { AiFillCloud, AiOutlineSetting } from "react-icons/ai";
import { CgShoppingBag } from "react-icons/cg";
import { useAppSelector } from "../redux/hook";

const ControlBar = () => {
    const userState = useAppSelector((state:any) => state.user);

    return (
        <div className={style.controlbar}>
            <div className={style.control_top}>
                <div className={style.control_top_item}>
                    <img
                        src={
                            process.env.REACT_APP_URL +
                            "/static/avatar/" +
                            userState.user.avatar
                        }
                        alt=""
                    />
                </div>
                <div className={style.control_top_item}>
                    <RiMessage3Fill></RiMessage3Fill>
                </div>
                <div className={style.control_top_item}>
                    <MdPermContactCalendar />
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
                    <AiOutlineSetting />
                </div>
            </div>
        </div>
    );
};

export default ControlBar;
