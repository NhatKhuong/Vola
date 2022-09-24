import { createSlice } from "@reduxjs/toolkit";
import roomAPI from "./roomAPI";

interface chatItem {
    type: string;
    _id: string;
    user: User;
    content: string;
    createdAt: Date;
}

interface User {
    _id: string;
    avatar: string;
    name: string;
}

interface fileItem {
    type: string;
    _id: string;
    user: User;
    content: string;
    createdAt: Date;
}

interface picItem {
    type: string;
    _id: string;
    user: User;
    content: string;
    createdAt: Date;
}

interface StateType {
    lstChat?: chatItem[];
    lstFile?: fileItem[];
    lstPic?: picItem[];
}

const initialState = {
    lstChat: [],
    lstFile: [],
    lstPic: [],
} as StateType;

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(
            roomAPI.getListChat().fulfilled,
            (state: StateType, action) => {
                state.lstChat = action.payload;
            }
        );
        builder.addCase(roomAPI.getListChat().rejected, (state) => {});

        builder.addCase(
            roomAPI.getListFile().fulfilled,
            (state: StateType, action) => {
                state.lstFile = action.payload;
            }
        );
        builder.addCase(roomAPI.getListFile().rejected, (state) => {});

        builder.addCase(
            roomAPI.getListPic().fulfilled,
            (state: StateType, action) => {
                state.lstPic = action.payload;
            }
        );
        builder.addCase(roomAPI.getListPic().rejected, (state) => {});
    },
});
