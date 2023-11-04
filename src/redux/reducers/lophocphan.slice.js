import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateProduct, apiDeleteProduct, apiGetProducts, apiUpdateProduct } from "../../api/productApi";

const initEntityState = {
    lophocphan: [],
    currentEntity: {},
    showModal: false,
    isUpdate: false
}

export const fetchData = createAsyncThunk("lophocphan/fetchData", async () => {
    const entity = await apiGetProducts();
    return entity;
})

export const create = createAsyncThunk("lophocphan/create", async (args) => {
    const { entity, showModal } = args;
    const _entity = await apiCreateProduct(entity);
    return {
        _entity,
        showModal
    };
})

export const update = createAsyncThunk("lophocphan/update", async (args) => {
    const { entity, showModal } = args;
    const entityUpdate = await apiUpdateProduct(entity);
    return {
        entityUpdate,
        showModal
    };
})

export const deleteData = createAsyncThunk("lophocphan/deleteData", async (id) => {
    await apiDeleteProduct(id);
    return id;
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
            .addCase(fetchData.fulfilled, (state, action) => {
                state.lophocphan = action.payload 
            })
            .addCase(create.fulfilled, (state, action) => {
                const newData = [...state.lophocphan, action.payload._monhoc]
                state.lophocphan = newData
                state.showModal = action.payload.showModal
            })
            .addCase(update.fulfilled, (state, action) => {
                state.showModal = action.payload.showModal
                state.lophocphan = state.lophocphan.map(item => {
                    if (item.id === action.payload.monHocUpdate.id) {
                        item = action.payload.monHocUpdate;
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

