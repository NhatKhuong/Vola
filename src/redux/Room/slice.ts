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
  name: string;
  avatar?: string;
  owner?:string;
  lstMember: any;
}

const initialState = {
  lstChat: [],
  lstFile: [],
  lstPic: [],
  _id: "",
  messageSent: "",
  name: "",
  avatar: "",
  lstMember: [],
  owner:"",
} as StateType;

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clear: (state) => {
      state = initialState;
      // state.is_login = false;
      // state.accessToken = "";
      // return { ...initialState, is_login: false, accessToken: ""};
    },
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
        state.lstChat?.push(action.payload.message);
      }
    );
    builder.addCase(roomAPI.updateListChat().rejected, (state) => {});

    builder.addCase(
      roomAPI.saveRoomId().fulfilled,
      (state: StateType, action) => {
        state._id = action.payload._id;
        state.name = action.payload.name;
        state.avatar = action.payload.avatar;
        state.lstMember = action.payload.lstMember;
        state.owner = action.payload.owner;
      }
    );
    builder.addCase(roomAPI.saveRoomId().rejected, (state) => {});

    builder.addCase(
      roomAPI.updateSentMessage().fulfilled,
      (state: StateType, action) => {
        state.messageSent = action.payload;
      }
    );
    builder.addCase(roomAPI.updateSentMessage().rejected, (state) => {});
  },
});

export const { clear } = roomSlice.actions;
