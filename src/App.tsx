import { useEffect, useState, useRef } from "react";
import logo from "./logo.svg";
import "./App.css";
import ControlBar from "./ControlBar/ControlBar";
import FriendTag from "./FreindList/FriendTag";
import Content from "./Content/Content";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Login from "./Account/Login/Login";
import Register from "./Account/Register/Register";
import { useAppDispatch, useAppSelector } from "./redux/hook";
// import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";
// import io from "socket.io-client";
import io, { Socket } from "socket.io-client";
import roomAPI from "./redux/Room/roomAPI";
import tokenService from "./services/token.service";
// import Peer from "simple-peer";
import Peer from "simple-peer";
import WindowChat from "./ChatVideo/WindowChat";
import Manager from "./manager/Manager";

export let newSocket = io("https://frozen-caverns-53350.herokuapp.com");

function App() {
    // Call video

    const [me, setMe] = useState("");
    const [stream, setStream] = useState<any | null>(null);
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const myVideo = useRef<any | null>();
    const userVideo = useRef();
    const connectionRef = useRef();

    // Call video
    const userState = useAppSelector((state: any) => state.user);
    const roomState = useAppSelector((state: any) => state.room);
    const [socket, setSocket] = useState<Socket | null>(null);

    const rooms = userState.rooms;

    const dispatch = useAppDispatch();
    // const token = userState.accessToken;
    const token = tokenService.getAccessToken();

    const roomId = useRef(roomState._id);
    useEffect(() => {
        roomId.current = roomState._id;
    });
    const message = useRef(roomState.messageSent);
    useEffect(() => {
        message.current = roomState.messageSent;
    });
    useEffect(() => {
        if (userState.is_login) {
            dispatch(userAPI.getUserInfo()(tokenService.getAccessToken()));
        }
    }, []);

    useEffect(() => {
        console.log(
            "usereffech ------------------------------------------------------ "
        );
        newSocket.disconnect();
        newSocket = io("https://frozen-caverns-53350.herokuapp.com");
        newSocket?.on("server-send-message", function (data: any) {
            if (roomId.current === data.roomId) {
                dispatch(roomAPI.updateListChat()(data));
            }
            dispatch(
                userAPI.updateListChatForUserNoOnScreen()({
                    data,
                    roomId: data.roomId,
                    rooms,
                })
            );
        });
        newSocket?.on("connect", () => {
            console.log("connecting");
            newSocket.emit("start", { token: token });
        });
        newSocket?.on("disconnect", () => {
            console.log("disconnect");
        });

        // socket request add friend

        newSocket.on("send-friend-invite", function (data: any) {
            console.log(data);
            dispatch(
                userAPI.updateListRequestAddFriend()(data.friendInvite.user)
            );
        });

        // call video

        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;
            });

        newSocket.on("me", (id) => {
            setMe(id);
        });

        newSocket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });

        // call video

        return () => {
            newSocket?.off("connect");
            newSocket?.off("disconnect");
            newSocket?.off("server-send-message");
        };
        // }
    }, [token]);

    // const callUser = (id) => {
    // 	const peer = new Peer({
    // 		initiator: true,
    // 		trickle: false,
    // 		stream: stream
    // 	})
    // 	peer.on("signal", (data) => {
    // 		socket.emit("callUser", {
    // 			userToCall: id,
    // 			signalData: data,
    // 			from: me,
    // 			name: name
    // 		})
    // 	})
    // 	peer.on("stream", (stream) => {

    // 			userVideo.current.srcObject = stream

    // 	})
    // 	socket.on("callAccepted", (signal) => {
    // 		setCallAccepted(true)
    // 		peer.signal(signal)
    // 	})

    // 	connectionRef.current = peer
    // }

    // const answerCall =() =>  {
    // 	setCallAccepted(true)
    // 	const peer = new Peer({
    // 		initiator: false,
    // 		trickle: false,
    // 		stream: stream
    // 	})
    // 	peer.on("signal", (data) => {
    // 		socket.emit("answerCall", { signal: data, to: caller })
    // 	})
    // 	peer.on("stream", (stream) => {
    // 		userVideo.current.srcObject = stream
    // 	})

    // 	peer.signal(callerSignal)
    // 	connectionRef.current = peer
    // }

    // const leaveCall = () => {
    // 	setCallEnded(true)
    // 	connectionRef.current.destroy()
    // }
    return (
        <div className="App">
            <Routes>
                <Route element={<PrivateRoutes isLogin={userState.is_login} />}>
                    <Route
                        path="/voice-chat/:roomID/:myID/:friendID"
                        element={<WindowChat />}
                    />
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
                    <Route
                        path="/manager"
                        element={
                            <>
                                <ControlBar />
                                <Manager />
                                {/* <Content socket={socket} /> */}
                            </>
                        }
                    />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

interface PrivateRouteType {
    isLogin: boolean;
}

const PrivateRoutes = ({ isLogin }: PrivateRouteType) => {
    return isLogin ? <Outlet /> : <Navigate to="/login" />;
};

export default App;
