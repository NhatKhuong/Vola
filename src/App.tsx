import { useEffect, useState, useRef } from "react";
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
import tokenService from "./services/token.service";

function App() {
    const userState = useAppSelector((state: any) => state.user);
    const roomState = useAppSelector((state: any) => state.room);
    const [socket, setSocket] = useState<Socket | null>(null);
    console.log(socket);

    const rooms = userState.rooms;
    console.log(rooms);
    
    const dispatch = useAppDispatch();
    // const token = userState.accessToken;
    const token = tokenService.getAccessToken();
    const roomId = useRef(roomState._id);
    console.log(roomId);
    useEffect(() => {
        roomId.current = roomState._id;
    });
    const message = useRef(roomState.messageSent);
    useEffect(() => {
        message.current = roomState.messageSent;
    });
    console.log(message);
    useEffect(() => {
      if(userState.is_login){
        dispatch(userAPI.getUserInfo()(tokenService.getAccessToken()))

      }
    
    }, [])
    

    useEffect(() => {
      if(socket !== null){
        socket.disconnect();
      }
        const newSocket = io("http://localhost:5000", {
            query: {
                token: tokenService.getAccessToken(),
            },
        });
        setSocket(newSocket)
        // socket.emit("client-send-message", { token, roomId:roomId.current, content:message, type:"text"});
        newSocket?.on("server-send-message", function (data: any) {
            console.log(data.roomId);
            // console.log("=======",roomId);
            console.log(
                "====trong=====================================",
                roomId
            );
            console.log(roomState);

            if (roomState._id === data.roomId) {
            }
            console.log("====ngaoi===", roomId);

            if (roomId.current === data.roomId) {
                dispatch(roomAPI.updateListChat()(data));
            } else {
                console.log("khac");

                dispatch(
                    userAPI.updateListChatForUserNoOnScreen()({
                        data,
                        roomId: roomId.current,
                        rooms,
                    })
                );
            }
        });
        newSocket?.on("connect", () => {
            //   setIsConnected(true);
            console.log("connecting");
            setSocket(newSocket);
        });
        newSocket?.on("disconnect", () => {
            //   setIsConnected(false);
            console.log("disconnect");
        });
        return () => {
            socket?.off("connect");
            socket?.off("disconnect");
            socket?.off("server-send-message");
        };
    }, [token,userState]);

    console.log(roomState);
    console.log(socket);

    return (
        <div className="App">
            <Routes>
                <Route
                    path="/"
                    element={
                        <>
                            <ControlBar />
                            <FriendTag />
                            <Content socket={socket} />
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
