import { useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { HiOutlineCamera } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import ReactModal from "react-modal";
import MesageItem from "../FreindList/MesageItem";
import style from "./ModalCreateGroup.module.css";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import {
  closeModalAddMember,
  closeModalUpdateRoomInfo,
  oppenModalAddMember,
} from "../redux/statusCommon/slice";
import { useEffect } from "react";
import axios from "axios";
import userAPI from "../redux/user/userAPI";
import { AiFillEdit } from "react-icons/ai";
import { render } from "@testing-library/react";
import roomAPI from "../redux/Room/roomAPI";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    height: "55vh",
  },
};

let listUserId: String[] = [];

let name: String;

function ModalUpdateRoomInfo() {
  const fileInput = useRef(null);
  const [file, setFile] = useState();
  const dispatch = useAppDispatch();
  const commonState = useAppSelector((state: any) => state.statusCommon);
  const [preview, setPreview] = useState<any>();

  const [friends, setfriends] = useState([]);
  const userState = useAppSelector((state: any) => state.user);
  const token = userState.accessToken;
  const roomState = useAppSelector((state: any) => state.room);
  const roomId = roomState._id;
  useEffect(() => {
    setName(roomState.name);
    setPreview(roomState.avatar);
  }, [commonState.isOpenModalUpdateRoomInfo]);

  const close = () => {
    dispatch(closeModalUpdateRoomInfo());
    // setName(roomState.name)
  };

  const clickUploadFile = () => {
    (fileInput.current as any).value = null;
    (fileInput.current as any).click();
  };

  function handleUpload(event: any) {
    setFile(event.target.files[0]);
    // setFile(undefined); // set empty
    console.log(file);
    console.log(preview);
  }

  const [name, setName] = useState(commonState.name);
  async function handleUpdate() {
    try {
      const data = { name: name };
      var room: any = await axios.patch(
        `https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}/name`,
        data,
        {
          headers: { authorization: token as string },
        }
      );

      if (file) {
        let formData = new FormData();
        formData.append("avatar", file);
        setFile(undefined); // set empty

        axios
          .patch(`https://frozen-caverns-53350.herokuapp.com/api/rooms/${roomId}/avatar`, formData, {
            headers: {
              authorization: token!,
              "Content-type": "multipart/form-data",
            },
          })
          .then((res) => {
            console.log("1");
          })
          .catch((err) => {
            console.log(err);
            alert("Error Upload file");
          });
      }
      alert("Update Success");
      dispatch(closeModalUpdateRoomInfo());
      dispatch(
        roomAPI.saveRoomId()({ _id: roomId, avatar: preview, name: name })
      );
      dispatch(
        userAPI.updateRoomByIdUI()({ _id: roomId, avatar: preview, name: name })
      );
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (!file) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    // free memory when ever this component is unmounted
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  return (
    <div>
      <ReactModal
        style={customStyles}
        isOpen={commonState.isOpenModalUpdateRoomInfo}
        onRequestClose={() => dispatch(closeModalUpdateRoomInfo())}
      >
        <div className={style.Modal_createGroup}>
          <div className={style.Modal_createGroup_head}>
            <div className={style.Modal_createGroup_head_title}>
              Cập nhật thông tin nhóm
            </div>
            {/* <div className={style.Modal_createGroup_head_close}>
                            <IoMdClose onClick={() => dispatch(closeModalUpdateRoomInfo())} />
                        </div> */}
          </div>
          <div
            className={style.UpdateAvatart}
            style={{ display: "flex", margin: "10px" }}
          >
            <div
              className=""
              style={{ margin: "auto" }}
              onClick={clickUploadFile}
            >
              <img
                style={{ width: "60px", height: "60px", borderRadius: "50%" }}
                src={preview}
                alt=""
              />
              <AiFillEdit />
              <input
                hidden
                ref={fileInput}
                type="file"
                accept="image/*"
                onChange={handleUpload}
              />
            </div>
          </div>

          <div className="" style={{ fontSize: "14px" }}>
            Bạn có chắc muốn thây đổi thông tin cuộc hội thoại, khi xác nhận
            thông tin hội thoại mới sẽ hiển thị với tất cả thành viên
          </div>

          <div
            className={style.search_menber_block}
            style={{ border: "1px solid #e5e7eb", borderRadius: "3px" }}
          >
            <input
              type="text"
              value={name}
              style={{ fontSize: "14px", color: "#333" }}
              autoFocus
              onChange={(event) => setName(event.target.value)}
            />
          </div>
          <div className={style.Modal_footer} style={{ border: "none" }}>
            <button className={style.btn_modal_cancel} onClick={close}>
              Hủy
            </button>
            <button className={style.btn_modal_create} onClick={handleUpdate}>
              Xác nhận
            </button>
          </div>
        </div>
      </ReactModal>
    </div>
  );
}

export default ModalUpdateRoomInfo;
