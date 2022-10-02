import { useEffect, useState } from "react";
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
import io, {Socket} from "socket.io-client";
import roomAPI from "./redux/Room/roomAPI";
import {useSocket} from "./common/configSocket"

let socket:Socket;
export const sendMessageSocket = (
    roomId: any,
    content: any,
    type: any,
    token: any
) => {
    console.log("fincuon chat======================");

    socket.emit("client-send-message", { token, roomId, content, type });
};

console.log("=========================================");

function App() {
    const userState = useAppSelector((state: any) => state.user);
    const dispatch = useAppDispatch();
    const token = userState.accessToken;
    console.log({ token });

   const socket = useSocket();

    useEffect(() => {
        socket?.on("server-send-message", function(data)  {
            console.log("======dfdsfdsf dfsddgfdg====");
            console.log(data);

            dispatch(roomAPI.updateListChat()(data));
            console.log("=======dfdfsdfds==============");

        });
        // socket?.on("connect", () => {
        //     //   setIsConnected(true);
        //     console.log("connecting");
        // });
        // socket?.on("disconnect", () => {
        //     //   setIsConnected(false);
        //     console.log("disconnect");
        // });
        return () => {
            socket?.off("connect");
            socket?.off("disconnect");
            socket?.off("server-send-message");
        };
    }, []);

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
