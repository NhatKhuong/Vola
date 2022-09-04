import {useEffect} from "react";
import logo from "./logo.svg";
import "./App.css";
import ControlBar from "./ControlBar/ControlBar";
import FriendTag from "./FreindList/FriendTag";
import Content from "./Content/Content";
import { Route, Routes } from "react-router-dom";
import Login from "./Account/Login/Login";
import Register from "./Account/Register/Register";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import tokenService from "./services/token.service";
import userAPI from "./redux/user/userAPI";

function App() {
    const userState = useAppSelector((state) => state.user);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (tokenService.getRefreshToken() && userState.user.userName === "") {
            dispatch(userAPI.getUserInfo()());
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userState]);

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
