import { createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
import tokenService from "../../services/token.service";
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

interface ItemRequest{
    _id:string,
    user:User
}

interface StateType {
    user: User;
    rooms: IRoom[];
    error: boolean;
    is_login: boolean;
    accessToken: string;
    listRequest?:ItemRequest[];
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
    is_login: tokenService.getAccessToken() !== null,
    accessToken: tokenService.getAccessToken() || "",
    listRequest:[]
} as StateType;

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: (state) => {
            // state = initialState;
            // state.is_login = false;
            // state.accessToken = "";
            return { ...initialState, is_login: false, accessToken: "" };
        },
    },
    extraReducers: (builder) => {
        builder.addCase(
            userAPI.getUserInfo().fulfilled,
            (state: StateType, action) => {
                console.log(action.payload);
                
                tokenService.setAccessToken(action.payload.accessToken);
                // tokenService.setRefreshToken(action.payload.accessToken);
                state.error = false;
                state.is_login = true;
                state.user = action.payload.user;
                state.rooms = action.payload.rooms;
                state.accessToken = action.payload.accessToken;
                if(action.payload.user.friendInvites){
                    state.listRequest = action.payload.user.friendInvites
                }
                
            }
        );
        builder.addCase(userAPI.getUserInfo().rejected, (state) => {
            state.error = true;
            state.is_login = false;
        });

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
                for (var i = 0; i < action.payload.rooms.length; i++) {
                    console.log(action.payload.rooms[i]._id);
                    console.log(action.payload.roomId);
                    console.log("4");

                    if (
                        action.payload.rooms[i]._id ==
                        action.payload.data.roomId
                    ) {
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

        builder.addCase(
            userAPI.updateListRoomUI().fulfilled,
            (state: StateType, action) => {
                console.log(action.payload);
                const newArray = [action.payload].concat(state.rooms) 
                state.rooms = newArray;
            }
        );
        builder.addCase(
            userAPI.updateListRoomUI().rejected,
            (state) => {}
        );
    },
});

export const { logout } = userSlice.actions;
