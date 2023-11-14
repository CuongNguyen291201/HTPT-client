import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetSinhVien, apiSVLogin } from "../../api/sinhVienApi";

const initEntityState = {
    sinhvien: {},
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataSV = createAsyncThunk("sinhvien/fetchDataSV", async () => {
    const entity = await apiGetSinhVien();
    return entity;
})

export const loginGV = createAsyncThunk("sinhvien/loginGV", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiSVLogin(entity);
    return {
        _entity,
        showModal
    };
})


export const sinhVienSlice = createSlice({
    name: "sinhvien",
    initialState: initEntityState,
    reducers: {
        showModal: (state, action) => {
            state.showModal = action.payload.showModal
            state.isUpdate = action.payload.isUpdate
            state.currentEntity = action.payload.currentEntity
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataSV.fulfilled, (state, action) => {
                state.sinhvien = action.payload 
            })
            .addCase(loginGV.fulfilled, (state, action) => {
                const newData = action.payload._entity
                state.sinhvien = newData
            })
    }
});

export const { showModal } = sinhVienSlice.actions;
export default sinhVienSlice.reducer;

