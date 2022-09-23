import { createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
// import tokenService from "../../services/token.service";

interface User {
    userName: string;
    avatar: string;
    fullName: string;
    email: string;
}

export interface IRoom {
    users: IUserRoom[];
    _id?: string;
    name?: string;
    avatar?: string;
    message: IMessage[];
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
}

const initialState = {
    user: {
        userName: "",
        avatar: "",
        fullName: "",
        email: "",
    },
    rooms:[],
    error: false,
    is_login: false,
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
    },
});
