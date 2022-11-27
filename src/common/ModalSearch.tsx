import { useState } from "react";
import style from "./ModalSearch.module.css";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
    oppenModalSearch,
    closeModalsearch,
    oppenModalInfo,
} from "../redux/statusCommon/slice";
import { useEffect } from "react";
import axios from "axios";
import infoAPI from "../redux/Info/infoAPI";

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
let email: String;

function ModalSearch() {
    const dispatch = useAppDispatch();
    const statusState = useAppSelector((state: any) => state.statusCommon);
    const userState = useAppSelector((state: any) => state.user);
    const [listResult, setListResult] = useState([]);
    const token = userState.accessToken;
    function handelClick(e: any) {
        dispatch(closeModalsearch());
        dispatch(oppenModalInfo());
        dispatch(
            infoAPI.updateInfo()({
                email: e.email,
                avatar: e.avatar,
                _id: e._id,
            })
        );
    }

    const onKeyUpValue = (event: any) => {
        email = event.target.value;
    };

    const handelSearch = async () => {
        try {
            var user: any = await axios.get(
                `http://18.140.239.96/api/users/email/${email}`,
                {
                    headers: { authorization: token as string },
                }
            );
            setListResult(user.data.result);
        } catch (error) {
            setListResult([]);
        }
    };
    return (
        <div>
            <ReactModal
                style={customStyles}
                isOpen={statusState.isOpenModalSearch}
                onRequestClose={() => {
                    dispatch(closeModalsearch());
                }}
            >
                <div className={style.Modal_createGroup}>
                    <div className={style.Modal_createGroup_head}>
                        <div className={style.Modal_createGroup_head_title}>
                            Tìm kiếm người dùng
                        </div>
                        {/* <div className={style.Modal_createGroup_head_close}>
                    <IoMdClose onClick={()=>{dispatch(closeModalsearch())}} />
                </div> */}
                    </div>
                    <div className={style.Modal_createGroup_body}>
                        <div className={style.input_search_block}>
                            <input
                                placeholder="Nhập số Email cần tìm"
                                className={style.Modal_Input_search}
                                type="text"
                                onKeyUp={onKeyUpValue}
                            />
                        </div>
                        <div className={style.result_search_list_container}>
                            {listResult.map((e: any) => {
                                return (
                                    <div
                                        className={
                                            style.result_search_list_item
                                        }
                                        onClick={() => handelClick(e)}
                                    >
                                        <img
                                            className={style.image}
                                            src={
                                                e.avatar ||
                                                "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png"
                                            }
                                            alt=""
                                        />
                                        <div className={style.info}>
                                            <div
                                                className=""
                                                style={{ fontSize: "14px" }}
                                            >
                                                {e.email}
                                            </div>
                                            {/* <div className="" style={{ fontSize: "12px", color: "#333" }}>0943334356</div> */}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* <div className={style.result_search_list_item} onClick={handelClick}>
                                <img className={style.image} src="https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg" alt="" />
                                <div className={style.info}>
                                    <div className="" style={{ fontSize: "14px" }}>Nguyễn Thị Kim Hoa</div>
                                    <div className="" style={{ fontSize: "12px", color: "#333" }}>0943334356</div>
                                </div>
                            </div> */}
                            {/* <div className={style.result_search_list_item}>
                        <img className={style.image} src="https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg" alt="" />
                        <div className={style.info}>
                            <div className="" style={{fontSize:"14px"}}>Nguyễn Thị Kim Hoa</div>
                            <div className="" style={{fontSize:"12px", color:"#333"}}>0943334356</div>
                        </div>
                    </div>
                    <div className={style.result_search_list_item}>
                        <img className={style.image} src="https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg" alt="" />
                        <div className={style.info}>
                            <div className="" style={{fontSize:"14px"}}>Nguyễn Thị Kim Hoa</div>
                            <div className="" style={{fontSize:"12px", color:"#333"}}>0943334356</div>
                        </div>
                    </div> */}
                        </div>
                    </div>
                    <div className={style.Modal_createGroup_footer}>
                        <div style={{ float: "right" }}>
                            <button
                                onClick={() => {
                                    dispatch(closeModalsearch());
                                }}
                                style={{
                                    backgroundColor: "#e5e7eb",
                                    width: "70px",
                                    height: "26px",
                                    fontSize: "12px",
                                    borderRadius: "3px",
                                    marginLeft: "20px",
                                }}
                            >
                                Hủy
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
                                onClick={handelSearch}
                            >
                                Tìm kiếm
                            </button>
                        </div>
                    </div>

                    <div className=""></div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ModalSearch;
