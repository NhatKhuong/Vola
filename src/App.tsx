import { useEffect, useState, useRef  } from "react";
import logo from "./logo.svg";
import "./App.css";
import ControlBar from "./ControlBar/ControlBar";
import FriendTag from "./FreindList/FriendTag";
import Content from "./Content/Content";
import { Route, Routes } from "react-router-dom";
import Login from "./Account/Login/Login";
import Register from "./Account/Register/Register";
import { useAppDispatch, useAppSelector } from "./redux/hook";
// import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";
// import io from "socket.io-client";
import io, { Socket } from "socket.io-client";
import roomAPI from "./redux/Room/roomAPI";
import { useSocket } from "./common/configSocket";

let socket: Socket;
export const sendMessageSocket = (
    roomId: any,
    content: any,
    type: any,
    token: any
) => {
    socket.emit("client-send-message", { token, roomId, content, type });
};
function App() {
    const userState = useAppSelector((state: any) => state.user);
    const roomState = useAppSelector((state: any) => state.room);
    const rooms = userState.rooms;
    // const [roomId, setRoomId] = useState(roomState._id)
    const dispatch = useAppDispatch();
    const token = userState.accessToken;
    console.log({ token });
    // const roomId = roomState._id;
    // console.log(roomId);
    // console.log("1");
    // console.log(roomState);
    const roomId = useRef(roomState._id);
    console.log(roomId);
    useEffect(() => {    roomId.current = roomState._id; });
    

    useEffect(() => {
      console.log("2");
      
        const socket = io("http://localhost:5000", {
          query: {
            token: token,
          },
        });
        socket?.on("server-send-message", function (data) {
          console.log(data.roomId);
          // console.log("=======",roomId);
          console.log("====trong=====================================",roomId);
          console.log(roomState);
          
          if(roomState._id === data.roomId){
              
        }
        console.log("====ngaoi===",roomId);

        if(roomId.current === data.roomId){
            dispatch(roomAPI.updateListChat()({data,roomId,rooms}));
        } else{
          console.log("khac");
          
            dispatch(userAPI.updateListChatForUserNoOnScreen()({data,roomId:roomId.current,rooms}))
          }
        });
        socket?.on("connect", () => {
          //   setIsConnected(true);
          console.log("connecting");
        });
        socket?.on("disconnect", () => {
          //   setIsConnected(false);
          console.log("disconnect");
        });
        return () => {
          socket?.off("connect");
          socket?.off("disconnect");
          socket?.off("server-send-message");
        };
      }, [token]);

      console.log(roomState);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <ControlBar />
                            <FriendTag />
                            <Content />
                        </>
                    }
                />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
