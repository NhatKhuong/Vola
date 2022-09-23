// import { createSlice } from "@reduxjs/toolkit";
// import roomApi from "./roomApi";
// // import tokenService from "../../services/token.service";

// interface User {
//     userName: string;
//     avatar: string;
//     fullName: string;
//     email: string;
// }
  
//   interface IMessage {
//     _id?: string;
//     user: User;
//     content: string;
//     type: string;
//     createdAt: Date;
//   }

// interface StateType {
//     iMessage: IMessage;
// }

// const initialState = {
//     user: {
//         userName: "",
//         avatar: "",
//         fullName: "",
//         email: "",
//     },
//     rooms:[],
//     error: false,
//     is_login: false,
// } as StateType;

// export const userSlice = createSlice({
//     name: "user",
//     initialState,
//     reducers: {
//         //
//     },
//     extraReducers: (builder) => {
//         builder.addCase(
//             roomApi.getRoom().fulfilled,
//             (state: StateType, action) => {
//                 // tokenService.setAccessToken(action.payload.access_token);
//                 // tokenService.setRefreshToken(action.payload.refresh_token);
//                 state.error = false;
//                 state.is_login = true;
//                 state.user = action.payload.user;
//                 state.rooms = action.payload.rooms;
//             }
//         );
//         builder.addCase(userAPI.login().rejected, (state) => {
//             state.error = true;
//             state.is_login = false;
//         });

//         builder.addCase(
//             userAPI.getUserInfo().fulfilled,
//             (state: StateType, action) => {
//                 // state.user = action.payload;
//                 state.error = false;
//                 state.is_login = true;
//             }
//         );
//     },
// });
import React from 'react'

function slice() {
  return (
    <div>slice</div>
  )
}

export default slice
