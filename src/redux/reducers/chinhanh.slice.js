import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetChiNhanh } from "../../api/chiNhanhApi";

const initEntityState = {
    chinhanh: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataCHN = createAsyncThunk("chinhanh/fetchDataCN", async () => {
    const entity = await apiGetChiNhanh();
    return entity;
})

export const chiNhanhSlice = createSlice({
    name: "chinhanh",
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
            .addCase(fetchDataCHN.fulfilled, (state, action) => {
                state.chinhanh = action.payload 
            })
    }
});

export const { showModal } = chiNhanhSlice.actions;
export default chiNhanhSlice.reducer;

