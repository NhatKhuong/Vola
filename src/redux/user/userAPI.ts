import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

class UserAPI {
    getUserInfo() {
        return createAsyncThunk("user/get-user-info", async (data: any, thunkAPI) => {
            const result:any = await authService.login(data);
            if(result.status === 200) {
                const userResult =  result.data;
                userResult.accessToken = data;
                return userResult;
            } 
            return thunkAPI.rejectWithValue("login_fail")
            
            // const { userName, password } = data;
            // const result = await authService.login(userName, password);

            // if (result.status === 200) return result.data;
            // return thunkAPI.rejectWithValue("login_fail");
        });
    }

    updateListChatForUserNoOnScreen(){
        return createAsyncThunk("room/update-list-chat-for-userNoOnScreen", async (data: any, thunkAPI) => {
            console.log(data);
            // const rooms = useAppSelector((state: any) => state.user).rooms;
            // const roomId = useAppSelector((state: any) => state.room)._id;
            // console.log(rooms);
            // console.log(roomId);
            // const {accessToken,_id} = data;
            // const result:any = await businessService.getListChat(accessToken,_id);
            // if(result.status === 200) return result.data
            // return thunkAPI.rejectWithValue("login_fail")
            return data;

        });
    }
}

export default new UserAPI();
