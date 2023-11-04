import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateProduct, apiDeleteProduct, apiGetProducts, apiUpdateProduct } from "../../api/productApi";

const initEntityState = {
    chuyennganh: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchData = createAsyncThunk("chuyennganh/fetchData", async () => {
    const entity = await apiGetProducts();
    return entity;
})

export const create = createAsyncThunk("chuyennganh/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateProduct(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("chuyennganh/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateProduct(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("chuyennganh/deleteData", async (id) => {
    await apiDeleteProduct(id);
    return id;
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
            .addCase(fetchData.fulfilled, (state, action) => {
                state.chuyennganh = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.chuyennganh, action.payload._monhoc]
                state.chuyennganh = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.chuyennganh = state.chuyennganh.map(item => {
                    if (item.id === action.payload.monHocUpdate.id) {
                        item = action.payload.monHocUpdate;
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

