import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateLopHocPhan, apiDeleteLopHocPhan, apiGetLopHocPhan, apiUpdateLopHocPhan } from "../../api/lopHocPhanApi";

const initEntityState = {
    lophocphan: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchDataLHP = createAsyncThunk("lophocphan/fetchDataLHP", async () => {
    const entity = await apiGetLopHocPhan();
    return entity;
})

export const create = createAsyncThunk("lophocphan/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateLopHocPhan(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("lophocphan/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateLopHocPhan(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("lophocphan/deleteData", async (entity) => {
    await apiDeleteLopHocPhan(entity);
    return entity.id;
})

export const lopHocPhanSlice = createSlice({
    name: "lophocphan",
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
            .addCase(fetchDataLHP.fulfilled, (state, action) => {
                state.lophocphan = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.lophocphan, action.payload._entity]
                state.lophocphan = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.lophocphan = state.lophocphan.map(item => {
                    if (item.id === action.payload.entityUpdate.id) {
                        item = action.payload.entityUpdate;
                    }
                    return item;
                })
            })
            .addCase(deleteData.fulfilled, (state, action) => {
                const newData = state.lophocphan.filter(item => item.id !== action.payload)
                state.lophocphan = newData
            })
    }
});

export const { showModal } = lopHocPhanSlice.actions;
export default lopHocPhanSlice.reducer;

