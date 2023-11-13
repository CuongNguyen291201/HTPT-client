import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateChuyenNganh, apiDeleteChuyenNganh, apiGetChuyenNganh, apiUpdateChuyenNganh } from "../../api/chuyenNganhApi";

const initEntityState = {
    chuyennganh: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataCN = createAsyncThunk("chuyennganh/fetchDataCN", async () => {
    const entity = await apiGetChuyenNganh();
    return entity;
})

export const create = createAsyncThunk("chuyennganh/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateChuyenNganh(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("chuyennganh/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateChuyenNganh(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("chuyennganh/deleteData", async (entity) => {
    await apiDeleteChuyenNganh(entity);
    return entity?.id;
})

export const chuyenNganhSlice = createSlice({
    name: "chuyennganh",
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
            .addCase(fetchDataCN.fulfilled, (state, action) => {
                state.chuyennganh = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.chuyennganh, action.payload._entity]
                state.chuyennganh = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.chuyennganh = state.chuyennganh.map(item => {
                    if (item.id === action.payload.entityUpdate.id) {
                        item = action.payload.entityUpdate;
                    }
                    return item;
                })
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                const newData = state.chuyennganh.filter(item => item.id !== action.payload)
                state.chuyennganh = newData
            })
    }
});

export const { showModal } = chuyenNganhSlice.actions;
export default chuyenNganhSlice.reducer;

