import { createSlice } from "@reduxjs/toolkit";

interface StatusCommon {
    isOpenModal: boolean;
    isOpenModalSearch: boolean;
    isOpenModalInfo: boolean;
}

const initialState: StatusCommon = {
    isOpenModal: false,
    isOpenModalSearch: false,
    isOpenModalInfo: false,
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
    },
});

export const {
    oppenModal,
    closeModal,
    oppenModalSearch,
    closeModalsearch,
    oppenModalInfo,
    closeModalInfo,
} = StatusCommonSlice.actions;
