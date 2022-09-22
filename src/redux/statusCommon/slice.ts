import { createSlice } from "@reduxjs/toolkit";

interface StatusCommon {
    isOpenModal: boolean;
}

const initialState: StatusCommon = {
        isOpenModal: false,
};

export const StatusCommonSlice = createSlice({
    name: "statusCommon",
    initialState,
    reducers: {
        oppenModal:(state)=>{
            state.isOpenModal = true;
        },
        closeModal:(state)=>{
            state.isOpenModal = false;
        }
    },
});

export const {oppenModal,closeModal} = StatusCommonSlice.actions


