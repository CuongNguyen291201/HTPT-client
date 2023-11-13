import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateDangKy, apiDeleteDangKy, apiGetDangKy, apiUpdateDangKy } from "../../api/dangKyApi";

const initEntityState = {
    dangky: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataDK = createAsyncThunk("dangky/fetchDataDK", async () => {
    const entity = await apiGetDangKy()
    return entity;
})

export const create = createAsyncThunk("dangky/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateDangKy(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("dangky/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateDangKy(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("dangky/deleteData", async (entity) => {
    await apiDeleteDangKy(entity);
    return entity?.id;
})

export const dangKySlice = createSlice({
    name: "dangky",
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
            .addCase(fetchDataDK.fulfilled, (state, action) => {
                state.dangky = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.dangky, action.payload._entity]
                state.dangky = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.dangky = state.dangky.map(item => {
                    if (item.id === action.payload.entityUpdate.id) {
                        item = action.payload.entityUpdate;
                    }
                    return item;
                })
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                const newData = state.dangky.filter(item => item.id !== action.payload)
                state.dangky = newData
            })
    }
});

export const { showModal } = dangKySlice.actions;
export default dangKySlice.reducer;

