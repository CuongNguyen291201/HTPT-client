import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGVLogin, apiGetGiangVien } from "../../api/giangVienApi";

const initEntityState = {
    giangvien: {},
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataGV = createAsyncThunk("giangvien/fetchDataGV", async () => {
    const entity = await apiGetGiangVien();
    return entity;
})

export const loginGV = createAsyncThunk("giangvien/loginGV", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiGVLogin(entity);
    return {
        _entity,
        showModal
    };
})


export const giangVienSlice = createSlice({
    name: "giangvien",
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
            .addCase(fetchDataGV.fulfilled, (state, action) => {
                state.giangvien = action.payload 
            })
            .addCase(loginGV.fulfilled, (state, action) => {
                const newData = action.payload._entity
                state.giangvien = newData
            })
    }
});

export const { showModal } = giangVienSlice.actions;
export default giangVienSlice.reducer;

