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
    _id?: string;
    messageSent?: string;
}

const initialState = {
    lstChat: [],
    lstFile: [],
    lstPic: [],
    _id: "",
    messageSent:"",
} as StateType;

export const roomSlice = createSlice({
    name: "room",
    initialState,
    reducers: {
        
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

        builder.addCase(
            roomAPI.updateListChat().fulfilled,
            (state: StateType, action) => {
                console.log(action.payload);
                
                state.lstChat?.push(action.payload.message)
            }
        );
        builder.addCase(roomAPI.updateListChat().rejected, (state) => {});

        builder.addCase(
            roomAPI.saveRoomId().fulfilled,
            (state: StateType, action) => {
                state._id = action.payload
                console.log(action.payload);
                
                
            }
        );
        builder.addCase(roomAPI.saveRoomId().rejected, (state) => {});

        // builder.addCase(
        //     roomAPI.saveSentMessageContainer().fulfilled,
        //     (state: StateType, action) => {
        //         state.messageSent = action.payload
        //     }
        // );
        // builder.addCase(roomAPI.saveSentMessageContainer().rejected, (state) => {});
    }
});
