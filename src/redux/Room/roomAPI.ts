import { createAsyncThunk } from "@reduxjs/toolkit";
import businessService from "../../services/business.service";

class RoomAPI{
    getRoom() {
        return createAsyncThunk("romm/get-room", async (data: any, thunkAPI) => {
            const {accessToken} = data;
            const result:any = await businessService.getRoom(data);
            if(result.status === 200) return result.data
            return thunkAPI.rejectWithValue("login_fail")
            
            // const { userName, password } = data;
            // const result = await authService.login(userName, password);

            // if (result.status === 200) return result.data;
            // return thunkAPI.rejectWithValue("login_fail");
        });
    }
}

export default new RoomAPI()