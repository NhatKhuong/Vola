import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

class UserAPI {
        login() {
        return createAsyncThunk("user/login", async (data: any, thunkAPI) => {
            const {accessToken} = data;
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

    getUserInfo() {
        return createAsyncThunk(
            "user/get-user-info",
            async (data, thunkAPI) => {
                // const result = await authService.getUserInfo();
                // if (result.status === 200) {
                //     return result.data.user;
                // }
                // return thunkAPI.rejectWithValue("get_info_fail");
            }
        );
    }
}

export default new UserAPI();
