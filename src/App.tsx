import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ControlBar from "./ControlBar/ControlBar";
import FriendTag from "./FreindList/FriendTag";
import Content from "./Content/Content";

function App() {
    return (
        <div className="App">
            <ControlBar />
            <FriendTag />
            <Content />
        </div>
    );
}

export default App;
