import { createAsyncThunk } from "@reduxjs/toolkit";
import businessService from "../../services/business.service";

class RoomAPI {
  getListChat() {
    return createAsyncThunk(
      "room/get-list-chat",
      async (data: any, thunkAPI) => {
        const { accessToken, _id } = data;
        const result: any = await businessService.getListChat(accessToken, _id);
        if (result.status === 200) return result.data;
        return thunkAPI.rejectWithValue("login_fail");
      }
    );
  }
  getListFile() {
    return createAsyncThunk(
      "romm/get-list-file",
      async (data: any, thunkAPI) => {
        const { accessToken } = data;
        const result: any = await businessService.getListFile(data);
        if (result.status === 200) return result.data;
        return thunkAPI.rejectWithValue("login_fail");
      }
    );
  }
  getListPic() {
    return createAsyncThunk(
      "room/get-list-pic",
      async (data: any, thunkAPI) => {
        const { accessToken } = data;
        const result: any = await businessService.getListPic(data);
        if (result.status === 200) return result.data;
        return thunkAPI.rejectWithValue("login_fail");
      }
    );
  }
  updateListChat() {
    return createAsyncThunk(
      "room/update-list-chat",
      async (data: any, thunkAPI) => {
        return data

        });
    }
    
    saveRoomId(){
        return createAsyncThunk("room/save-room-id", async (data: any, thunkAPI) => {
            console.log(data);
            
            // const {accessToken,_id} = data;
            // const result:any = await businessService.getListChat(accessToken,_id);
            // if(result.status === 200) return result.data
            // return thunkAPI.rejectWithValue("login_fail")
            return data;
            
        });
    }
  updateSentMessage() {
    return createAsyncThunk("room/update-send-message",async (data: any, thunkAPI) => {
        console.log(data);
        return data;
      }
    );
  }
}

export default new RoomAPI();
