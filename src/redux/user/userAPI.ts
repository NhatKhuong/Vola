import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../../services/auth.service";

class UserAPI {
    getUserInfo() {
        return createAsyncThunk(
            "user/get-user-info",
            async (data: any, thunkAPI) => {
                const result: any = await authService.login(data);
                if (result.status === 200) {
                    const userResult = result.data;
                    userResult.accessToken = data;
                    console.log(result);
                    return userResult;
                }
                
                return thunkAPI.rejectWithValue("login_fail");
            }
        );
    }

    updateListChatForUserNoOnScreen() {
        console.log("update no onscreen");
        return createAsyncThunk(
            "room/update-list-chat-for-userNoOnScreen",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }
    updateListRoomUI() {
        return createAsyncThunk(
            "room/update-list-room",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }
    updateListRequestAddFriend() {
        return createAsyncThunk(
            "room/update-list-request-add-friend",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }
    deleteRequestAddFriend() {
        return createAsyncThunk(
            "room/delete-request-add-friend",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }
    updateRoomByIdUI() {
        return createAsyncThunk(
            "room/update-room-by-id",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }

    deleteRoomByIdUI() {
        return createAsyncThunk(
            "room/delete-room-by-id",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }

    updatChangeOwnerUI() {
        return createAsyncThunk(
            "room/update-owner-room",
            async (data: any, thunkAPI) => {
                return data;
            }
        );
    }

    reLoad() {
        return createAsyncThunk(
            "room/reload-ui",
            async (data: any, thunkAPI) => {
                const result: any = await authService.login(data);
                if (result.status === 200) {
                    const userResult = result.data;
                    userResult.accessToken = data;
                    return userResult;
                }
                return thunkAPI.rejectWithValue("login_fail");
            }
        );
    }
}

export default new UserAPI();
