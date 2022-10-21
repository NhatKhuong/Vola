import {useState} from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "../FreindList/MesageItem";
import style from "./ModalCreateGroup.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { closeModal } from "../redux/statusCommon/slice";
import {useEffect} from "react";
import axios from "axios";
import userAPI from "../redux/user/userAPI";


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
        width: "450px",
        height: "95vh"
    },
};

let listUserId: String[]= []

let name: String;

const addUser=(userId: String) =>{
    
    const isExist = listUserId.findIndex(e=>e==userId) !=-1
    if(isExist) {
        // remove
        listUserId =  listUserId.filter(e=>e!=userId)
    }  else{

        listUserId.push(userId)
    }
    console.log({listUserId, userId, isExist})
}

function ModalCreateGroup(prop:Prop) {
    const dispatch = useAppDispatch();
    const commonState = useAppSelector((state: any) => state.statusCommon);
    // const commonState =  useAppSelector((state: any) => state.statusCommon);
    
    // const [modalIsOpen, setIsOpen] = useState(false);

    const [friends, setfriends] = useState([]);
    const userState = useAppSelector((state: any) => state.user);
    const token = userState.accessToken;

    useEffect(()=>{
        axios.get(`http://localhost:5000/api/users/friends`, {
                headers: { authorization: token as string },
            }).then((r:any)=>{
                console.log(r)
                setfriends(r.data)
            }).catch((err)=>{
                console.log(err)
            })
    }, [token])

    const onKeyUpValue=(event:any) => {
        //console.log(event.target.value)
        name= event.target.value
        console.log({name})
    }

    const createGroup= () => {
        if (listUserId.length<=1) {
            alert("Tạo nhóm phải 2 người trở lên")
            return
        } 
        if(!name) {
            alert("Nhập tên nhóm")
            return
        }
        axios.post(`http://localhost:5000/api/rooms`,{
            userIds:listUserId,
            name:name
            }, {
                headers: { authorization: token as string },
            }).then((r:any)=>{
                console.log(r)
                dispatch(closeModal())
                dispatch(userAPI.updateListRoomUI()(r.data))
                
            }).catch((err)=>{
                console.log(err)
        })
    }

    return (
        <div>
            <ReactModal
                style={customStyles}
                isOpen={commonState.isOpenModal}
                onRequestClose={()=>dispatch(closeModal())}
            >
                <div className={style.Modal_createGroup}>
                    <div className={style.Modal_createGroup_head}>
                        <div className={style.Modal_createGroup_head_title}>
                            Tạo nhóm
                        </div>
                        <div className={style.Modal_createGroup_head_close}>
                            <IoMdClose onClick={()=>dispatch(closeModal())} />
                        </div>
                    </div>

                    <div className={style.Modal_createGroup_name_group}>
                        <div
                            className={
                                style.Modal_createGroup_name_group_iconBlock
                            }
                        >
                            <HiOutlineCamera />
                        </div>
                        <div
                            className={
                                style.Modal_createGroup_name_group_name_group
                            }
                        >
                            <input type="text" placeholder="Nhập tên nhóm..." onKeyUp={onKeyUpValue} />
                        </div>
                    </div>
                    <div className={style.add_group_title}>
                        Thêm bạn vào nhóm
                    </div>
                    <div className={style.search_menber_block}>
                        <div className={style.search_menber_icon}>
                            <FiSearch />
                        </div>
                        <input
                            type="text"
                            placeholder="Nhập tên, số diện thoại, hoặc danh sách số điện thoại"
                        />
                    </div>
                    <hr />
                    <div className={style.add_group_title_chat_late}>
                        Trò chuyện gần đây
                    </div>
                    <div className={style.listMember}>
                        {
                            friends?.map((friend:any)=>{
                                return (
                                    <MesageItem
                                    _id = {friend.userId._id}
                                    avatar={friend.userId.avatar|| "https://hinhgaixinh.com/wp-content/uploads/2021/12/bo-anh-girl-xinh-cap-2.jpg"}                                    
                                    name={friend.userId.email} 
                                    messages="Hello jjj"
                                    time={new Date().toDateString()}
                                    info={true}
                                    addUser= {addUser}
                                    />
                                )
                            })
                        }
                        
                       
                    </div>
                    <div className={style.Modal_footer}>
                        <button className={style.btn_modal_cancel}>Hủy</button>
                        {/* <button className={style.btn_modal_create}>Tạo nhóm</button> */}
                        {
                            prop.isShare
                             ? 
                            <button className={style.btn_modal_create}>
                                Chia sẻ
                            </button>
                            :
                            <button className={style.btn_modal_create} onClick={()=>createGroup()}>
                                Tạo nhóm
                            </button>
                        }
                    </div>
                </div>
            </ReactModal>
        </div>
    );
}

export default ModalCreateGroup;
