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
  const dispatch = useAppDispatch();
  const token = userState.accessToken;

  useEffect(() => {
    console.log({ token: token });
    if (!token) {
      console.log("-----------error token");
      return;
    } else {
      console.log("-----------Ok token");
    }
    const socket = io("http://localhost:5000", {
      query: {
        token: token,
      },
    });
    socket?.on("server-send-message", function (data) {
      console.log("-----------------------------------==========");
      console.log({ data });
      dispatch(roomAPI.updateListChat()(data));
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
