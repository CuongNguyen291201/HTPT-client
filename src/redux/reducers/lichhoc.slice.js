import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateLichHoc, apiDeleteLichHoc, apiGetLichHoc, apiUpdateLichHoc } from "../../api/lichHocApi";

const initEntityState = {
    lichhoc: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataLH = createAsyncThunk("lichhoc/fetchDataLH", async () => {
    const entity = await apiGetLichHoc();
    return entity;
})

export const create = createAsyncThunk("lichhoc/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateLichHoc(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("lichhoc/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateLichHoc(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("lichhoc/deleteData", async (id) => {
    await apiDeleteLichHoc(id);
    return id;
})

export const lichHocSlice = createSlice({
    name: "lichhoc",
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
            .addCase(fetchDataLH.fulfilled, (state, action) => {
                state.lichhoc = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.lichhoc, action.payload._monhoc]
                state.lichhoc = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.lichhoc = state.lichhoc.map(item => {
                    if (item.id === action.payload.monHocUpdate.id) {
                        item = action.payload.monHocUpdate;
                    }
                    return item;
                })
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                const newData = state.lichhoc.filter(item => item.id !== action.payload)
                state.lichhoc = newData
            })
    }
});

export const { showModal } = lichHocSlice.actions;
export default lichHocSlice.reducer;

