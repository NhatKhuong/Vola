import { createSlice } from "@reduxjs/toolkit";
import roomAPI from "./roomAPI";

interface chatItem {
  type: string;
  _id: string;
  user: User;
  content: string;
  createdAt: Date;
  emoji?:string;
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
  emoji:string,
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
  emoji:"",
  owner:"",
} as StateType;

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    clear: (state) => {
      console.log("clear===========================");
      
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

    builder.addCase(
      roomAPI.updateChangeMessage().fulfilled,
      (state: StateType, action) => {
        state.lstChat?.forEach((item)=>{
          if(item._id === action.payload.messageId){
            item.type='unsend'
          }
        })
      }
    );
    builder.addCase(roomAPI.updateChangeMessage().rejected, (state) => {});

    builder.addCase(
      roomAPI.updateChangeIconMessage().fulfilled,
      (state: StateType, action) => {
        state.lstChat?.forEach((item)=>{
          if(item._id === action.payload.messageId){
            item.emoji=action.payload.react.emoji
          }
        })
      }
    );
    builder.addCase(roomAPI.updateChangeIconMessage().rejected, (state) => {});

    builder.addCase(
      roomAPI.updateOwnerRoom().fulfilled,
      (state: StateType, action) => {
        state.owner = action.payload.userId
      }
    );
    builder.addCase(roomAPI.updateOwnerRoom().rejected, (state) => {});

    builder.addCase(
      roomAPI.clear2().fulfilled,
      (state: StateType, action) => {
        state.lstChat= []
        state.lstFile= []
        state.lstPic= []
        state._id= ""
        state.messageSent= ""
        state.name= ""
        state.avatar= ""
        state.lstMember= []
        state.emoji=""
        state.owner=""
        
      }
    );
    builder.addCase(roomAPI.clear2().rejected, (state) => {});
  },
});

export const { clear } = roomSlice.actions;
