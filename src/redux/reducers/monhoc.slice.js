import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateProduct, apiDeleteProduct, apiGetProducts, apiUpdateProduct } from "../../api/productApi";

const initEntityState = {
    monhoc: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchData = createAsyncThunk("monhoc/fetchData", async () => {
    const entity = await apiGetProducts();
    return entity;
})

export const create = createAsyncThunk("monhoc/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateProduct(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("monhoc/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateProduct(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("monhoc/deleteData", async (id) => {
    await apiDeleteProduct(id);
    return id;
})

export const monHocSlice = createSlice({
    name: "monhoc",
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
            .addCase(fetchData.fulfilled, (state, action) => {
                state.monhoc = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.monhoc, action.payload._monhoc]
                state.monhoc = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.monhoc = state.monhoc.map(item => {
                    if (item.id === action.payload.monHocUpdate.id) {
                        item = action.payload.monHocUpdate;
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

