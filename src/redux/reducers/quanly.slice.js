import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetQuanLy, apiQLLogin } from "../../api/quanLyApi";

const initEntityState = {
    quanly: {},
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataQL = createAsyncThunk("quanly/fetchDataQL", async () => {
    const entity = await apiGetQuanLy();
    return entity;
})

export const loginQL = createAsyncThunk("quanly/loginQL", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiQLLogin(entity);
    return {
        _entity,
        showModal
    };
})


export const quanLySlice = createSlice({
    name: "quanly",
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
            .addCase(fetchDataQL.fulfilled, (state, action) => {
                state.quanly = action.payload 
            })
            .addCase(loginQL.fulfilled, (state, action) => {
                const newData = action.payload._entity
                state.quanly = newData
            })
    }
});

export const { showModal } = quanLySlice.actions;
export default quanLySlice.reducer;

