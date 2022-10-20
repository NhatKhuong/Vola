import { createSlice } from "@reduxjs/toolkit";

interface StatusCommon {
    isOpenModal: boolean;
    isOpenModalProfile:boolean;
    isOpenModalSearch:boolean;
    isOpenModalInfo:boolean;
}

const initialState: StatusCommon = {
        isOpenModal: false,
        isOpenModalProfile:false,
        isOpenModalSearch: false,
        isOpenModalInfo: false
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
        },
        oppenModalProfile:(state)=>{
            state.isOpenModalProfile =true;
        },
        closeModalProfile:(state)=>{
            state.isOpenModalProfile=false;
        },
        oppenModalSearch:(state)=>{
            state.isOpenModalSearch = true;
        },
        closeModalsearch:(state)=>{
            state.isOpenModalSearch = false;
        },
        oppenModalInfo:(state)=>{
            state.isOpenModalInfo = true;
        },
        closeModalInfo:(state)=>{
            state.isOpenModalInfo = false;
        }
    },
});

export const {oppenModal,closeModal,oppenModalProfile,closeModalProfile,oppenModalSearch,closeModalsearch,oppenModalInfo,closeModalInfo} = StatusCommonSlice.actions


