import { configureStore } from "@reduxjs/toolkit";
import { StatusCommonSlice } from "./statusCommon/slice";
import { userSlice } from "./user/slice";
import { roomSlice } from "./Room/slice";
import { infoSlice } from "./Info/slice";

export const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        statusCommon: StatusCommonSlice.reducer,
        room: roomSlice.reducer,
        info: infoSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;