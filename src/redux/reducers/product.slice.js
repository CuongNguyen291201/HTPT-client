import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateProduct, apiDeleteProduct, apiGetProducts, apiUpdateProduct } from "../../api/productApi";

const initProductState = {
    products: [],
    mapWebSeo: {},
    currentProduct: {},
    showModal: false,
    isUpdate: false
}

export const fetchProduct = createAsyncThunk("product/fetchProduct", async () => {
    const product = await apiGetProducts();
    return product;
})

export const createProduct = createAsyncThunk("product/createProduct", async (args) => {
    const { product, showModal } = args;
    const _product = await apiCreateProduct(product);
    return {
        _product,
        showModal
    };
})

export const updateProduct = createAsyncThunk("product/updateProduct", async (args) => {
    const { _id, product, showModal } = args;
    const productUpdate = await apiUpdateProduct(_id, product);
    return {
        productUpdate,
        showModal
    };
})

export const deleteProduct = createAsyncThunk("product/deleteProduct", async (_id) => {
    await apiDeleteProduct(_id);
    return _id;
})

export const productSlice = createSlice({
    name: "product",
    initialState: initProductState,
    reducers: {
        showModal: (state, action) => {
            state.showModal = action.payload.showModal
            state.isUpdate = action.payload.isUpdate
            state.currentProduct = action.payload.currentProduct
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchProduct.fulfilled, (state, action) => {
                state.webSeo = action.payload
                state.mapWebSeo = action.payload.reduce((map, item) => {
                    const { appId } = item;
                    map[appId] = [...(map[appId] || []), item]
                    return map;
                }, {})
            })
            .addCase(createProduct.fulfilled, (state, action) => {
                const newWebSeo = [...state.webSeo, action.payload._webSeo]
                state.webSeo = newWebSeo
                state.showModal = action.payload.showModal
                state.mapWebSeo = newWebSeo.reduce((map, item) => {
                    const { appId } = item;
                    map[appId] = [...(map[appId] || []), item]
                    return map;
                }, {})
            })
            .addCase(updateProduct.fulfilled, (state, action) => {
                const newWebSeo = state.webSeo.map(item => {
                    if (item._id === action.payload.webSeoUpdate._id) return action.payload.webSeoUpdate;
                    return item;
                })
                state.webSeo = newWebSeo
                state.showModal = action.payload.showModal
                state.mapWebSeo = newWebSeo.reduce((map, item) => {
                    const { appId } = item;
                    map[appId] = [...(map[appId] || []), item]
                    return map;
                }, {})
            })
            .addCase(deleteProduct.fulfilled, (state, action) => {
                const newWebSeo = state.webSeo.filter(item => item._id !== action.payload)
                state.webSeo = newWebSeo
                state.mapWebSeo = newWebSeo.reduce((map, item) => {
                    const { appId } = item;
                    map[appId] = [...(map[appId] || []), item]
                    return map;
                }, {})
            })
    }
});

export const { showModal } = productSlice.actions;
export default productSlice.reducer;

