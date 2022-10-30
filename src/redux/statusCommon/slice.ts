import { createSlice } from "@reduxjs/toolkit";

interface StatusCommon {
    isOpenModal: boolean;
    isOpenModalSearch: boolean;
    isOpenModalInfo: boolean;
    isOpenModalAddMember:boolean;
    isOpenModalUpdateRoomInfo:boolean;
}

const initialState: StatusCommon = {
    isOpenModal: false,
    isOpenModalSearch: false,
    isOpenModalInfo: false,
    isOpenModalAddMember:false,
    isOpenModalUpdateRoomInfo:false
};

export const StatusCommonSlice = createSlice({
    name: "statusCommon",
    initialState,
    reducers: {
        oppenModal: (state) => {
            state.isOpenModal = true;
        },
        closeModal: (state) => {
            state.isOpenModal = false;
        },
        oppenModalSearch: (state) => {
            state.isOpenModalSearch = true;
        },
        closeModalsearch: (state) => {
            state.isOpenModalSearch = false;
        },
        oppenModalInfo: (state) => {
            state.isOpenModalInfo = true;
        },
        closeModalInfo: (state) => {
            state.isOpenModalInfo = false;
            console.log(state.isOpenModalInfo);
        },
        oppenModalAddMember: (state) => {
            state.isOpenModalAddMember = true;
        },
        closeModalAddMember: (state) => {
            state.isOpenModalAddMember = false;
            console.log(state.isOpenModalInfo);
        },
        oppenModalUpdateRoomInfo: (state) => {
            state.isOpenModalUpdateRoomInfo = true;
        },
        closeModalUpdateRoomInfo: (state) => {
            state.isOpenModalUpdateRoomInfo = false;
            console.log(state.isOpenModalInfo);
        },
    },
});

export const {
    oppenModal,
    closeModal,
    oppenModalSearch,
    closeModalsearch,
    oppenModalInfo,
    closeModalInfo,
    oppenModalAddMember,
    closeModalAddMember,
    oppenModalUpdateRoomInfo,
    closeModalUpdateRoomInfo,
} = StatusCommonSlice.actions;
