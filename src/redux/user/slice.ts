import { createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
// import tokenService from "../../services/token.service";
import { useAppSelector, useAppDispatch } from "../hook";

interface User {
    userName: string;
    avatar: string;
    fullName: string;
    email: string;
    _id: string;
}

export interface IRoom {
    users: IUserRoom[];
    _id?: string;
    name?: string;
    avatar?: string;
    messages: IMessage[];
    typeRoom: string;
    createdAt?: Date;
    updatedAt?: Date;
}
interface IUserRoom {
    _id: string;
    lastMessageRead?: string;
    deletedAt?: Date | null;
}

interface IMessage {
    _id?: string;
    user: string;
    content: string;
    type: string;
    createdAt: Date;
}

interface StateType {
    user: User;
    rooms: IRoom[];
    error: boolean;
    is_login: boolean;
    accessToken: string;
}

const initialState = {
    user: {
        userName: "",
        avatar: "",
        fullName: "",
        email: "",
        _id: "",
    },
    rooms: [],
    error: false,
    is_login: false,
    accessToken: "",
} as StateType;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        //
    },
    extraReducers: (builder) => {
        builder.addCase(
            userAPI.login().fulfilled,
            (state: StateType, action) => {
                // tokenService.setAccessToken(action.payload.access_token);
                // tokenService.setRefreshToken(action.payload.refresh_token);
                state.error = false;
                state.is_login = true;
                state.user = action.payload.user;
                state.rooms = action.payload.rooms;
                state.accessToken = action.payload.accessToken;
            }
        );
        builder.addCase(userAPI.login().rejected, (state) => {
            state.error = true;
            state.is_login = false;
        });

        builder.addCase(
            userAPI.getUserInfo().fulfilled,
            (state: StateType, action) => {
                // state.user = action.payload;
                state.error = false;
                state.is_login = true;
            }
        );

        builder.addCase(
            userAPI.updateListChatForUserNoOnScreen().fulfilled,
            (state: StateType, action) => {
                console.log(action.payload);
                console.log(state.rooms[0].messages[0].content);
                console.log(action.payload.data.message.content);
                console.log(action.payload.rooms);
                
                // const rooms = useAppSelector((state: any) => state.user).rooms;
                // const roomId = useAppSelector((state: any) => state.room)._id;
                // console.log(rooms);
                // console.log(roomId);
                for (var i = 0; i <action.payload.rooms.length; i++) {
                    console.log(action.payload.rooms[i]._id);
                    console.log(action.payload.roomId);
                    console.log("4");
                    
                    
                    
                    if (action.payload.rooms[i]._id == action.payload.data.roomId) {
                        console.log(state.rooms[i].messages[0].content);
                        console.log(action.payload.data.message.content);
                        
                        
                        state.rooms[i].messages[0].content =
                            action.payload.data.message.content;
                    }
                }
            }
        );
        builder.addCase(
            userAPI.updateListChatForUserNoOnScreen().rejected,
            (state) => {}
        );
    },
});
