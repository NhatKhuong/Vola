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
import io from 'socket.io-client';
import roomAPI from "./redux/Room/roomAPI";


const socket = io();
function App() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [lastPong, setLastPong] = useState(null);
    const userState = useAppSelector((state: any) => state.user);
    const dispatch = useAppDispatch();
    // const token = userState.accessToken;
    // console.log({ token });

    // const socket = io("http://localhost:5000", {
    //     query: {
    //         token: token,
    //     },
    // });

    // const [reciveMessage, setReciveMessage] = useState(null);
    useEffect(() => {
        // // socket.on("server-send-message", (data) => {
        // //     dispatch(roomAPI.updateListChat()(data));
        // // });
        // socket.on('connect', () => {
        // //   setIsConnected(true);
        //     console.log("connect");
            
        // });
    
        // socket.on('disconnect', () => {
        // //   setIsConnected(false);
        //     console.log("disconnect");
            
        // });
      
        // return () => {
        //   socket.off('connect');
        //   socket.off('disconnect');
        //   socket.off('pong');
        // };
        // socket.on('connect', () => {
        //     setIsConnected(true);
        //     console.log("connect");
            
        //   });
      
        //   socket.on('disconnect', () => {
        //     setIsConnected(false);
        //     console.log("disconnect");
            
        //   });
      
        //   socket.on('pong', () => {
        //     // setLastPong(new Date().toString());
        //   });
      
        //   return () => {
        //     socket.off('connect');
        //     socket.off('disconnect');
        //     socket.off('pong');
        //   };
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
