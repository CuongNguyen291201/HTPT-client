import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateMonHoc, apiDeleteMonHoc, apiGetMonHoc, apiUpdateMonHoc } from "../../api/monHocApi";

const initEntityState = {
    monhoc: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataMH = createAsyncThunk("monhoc/fetchDataMH", async () => {
    const entity = await apiGetMonHoc();
    return entity;
})

export const create = createAsyncThunk("monhoc/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateMonHoc(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("monhoc/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateMonHoc(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("monhoc/deleteData", async (entity) => {
    await apiDeleteMonHoc(entity);
    return entity.id;
})

export const monHocSlice = createSlice({
    name: "monhoc",
    initialState: initEntityState,
    reducers: {
        showModal: (state, action) => {

            console.log('action.payload', action.payload)

            state.showModal = action.payload.showModal
            state.isUpdate = action.payload.isUpdate
            state.currentEntity = { ...action.payload.currentEntity }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchDataMH.fulfilled, (state, action) => {
                state.monhoc = action.payload
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.monhoc, action.payload._entity]
                state.monhoc = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.monhoc = state.monhoc.map(item => {
                    if (item.id === action.payload.entityUpdate.id) {
                        item = action.payload.entityUpdate;
                    }
                    return item;
                })
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                const newData = state.monhoc.filter(item => item.id !== action.payload)
                state.monhoc = newData
            })
    }
});

export const { showModal } = monHocSlice.actions;
export default monHocSlice.reducer;

