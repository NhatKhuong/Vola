import { createSlice } from "@reduxjs/toolkit";
import userAPI from "./userAPI";
import tokenService from "../../services/token.service";
import { useAppSelector, useAppDispatch } from "../hook";

interface User {
    userName?: string;
    avatar?: string;
    fullName?: string;
    email?: string;
    _id?: string;
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
    owner?:string;
    emoji?:string;
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

interface ItemRequest {
    _id?: string;
    user: User;
}

interface StateType {
    user: User;
    rooms: IRoom[];
    error: boolean;
    is_login: boolean;
    accessToken: string;
    listRequest?: ItemRequest[];
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
    listRequest: [],
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
                tokenService.setAccessToken(action.payload.accessToken);
                // tokenService.setRefreshToken(action.payload.accessToken);
                state.error = false;
                state.is_login = true;
                state.user = action.payload.user;
                state.rooms = action.payload.rooms;
                state.accessToken = action.payload.accessToken;
                if (action.payload.user.friendInvites) {
                    state.listRequest = action.payload.user.friendInvites.map(
                        (e: any) => {
                            const element: ItemRequest = {
                                _id: e._id,
                                user: e.userId,
                            };
                            return element;
                        }
                    );
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
                console.log({ RoomID: action.payload });
                console.log({ RoomID: action.payload.roomId });
                for (var i = 0; i < state.rooms.length; i++) {
                    console.log(state.rooms[i]._id);
                    if (action.payload.roomId === state.rooms[i]._id) {
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
                const newArray = [action.payload].concat(state.rooms);
                state.rooms = newArray;
            }
        );
        builder.addCase(userAPI.updateListRoomUI().rejected, (state) => {});

        builder.addCase(
            userAPI.updateListRequestAddFriend().fulfilled,
            (state: StateType, action) => {
                const result = {
                    _id: "",
                    user: {
                        userName: "",
                        avatar: action.payload.avatar as string,
                        fullName: "",
                        email: action.payload.email as string,
                        _id: action.payload._id,
                    },
                };
                state.listRequest?.push(result);
            }
        );
        builder.addCase(
            userAPI.updateListRequestAddFriend().rejected,
            (state) => {}
        );

        builder.addCase(
            userAPI.deleteRequestAddFriend().fulfilled,
            (state: StateType, action) => {
                var restult = state.listRequest?.filter(function (e) {
                    return e.user._id !== action.payload;
                });
                state.listRequest = restult;
            }
        );
        builder.addCase(
            userAPI.deleteRequestAddFriend().rejected,
            (state) => {}
        );
        builder.addCase(
            userAPI.updateRoomByIdUI().fulfilled,
            (state: StateType, action) => {
               for(var i=0;i<state.rooms.length;i++){
                if(state.rooms[i]._id === action.payload._id){
                    state.rooms[i]._id = action.payload._id;
                    state.rooms[i].name = action.payload.name;
                    state.rooms[i].avatar = action.payload.avatar;
                }
               }
            }
        );
        builder.addCase(
            userAPI.updateRoomByIdUI().rejected,
            (state) => {}
        ); 
        
        builder.addCase(
            userAPI.deleteRoomByIdUI().fulfilled,
            (state: StateType, action) => {
                var restult = state.rooms?.filter(function (e) {
                    return e._id !== action.payload;
                });
                state.rooms = restult;
            }
        );
        builder.addCase(
            userAPI.deleteRoomByIdUI().rejected,
            (state) => {}
        );    
    },
});

export const { logout } = userSlice.actions;
