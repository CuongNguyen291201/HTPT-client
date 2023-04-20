import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiCreateOrder, apiDeleteOrder, apiGetOrders, apiGetOrdersByUser } from "../../api/orderApi";

const initOrderState = {
    orders: [],
    orderByUser: [],
    currentOrder: {},
    showModal: false,
    isUpdate: false
}

export const getAllOrders = createAsyncThunk("order/getAllOrders", async () => {
    const order = await apiGetOrders();
    return order;
})

export const getOrderByUser = createAsyncThunk("order/getOrderByUser", async (userId) => {
    const order = await apiGetOrdersByUser(userId);
    return order;
})

export const createOrder = createAsyncThunk("order/createOrder", async (order) => {
    const _order = await apiCreateOrder(order);
    return _order;
})

export const deleteOrder = createAsyncThunk("order/deleteOrder", async (orderId) => {
    await apiDeleteOrder(orderId);
    return orderId;
})

export const productSlice = createSlice({
    name: "order",
    initialState: initOrderState,
    reducers: {
        // showModal: (state, action) => {
        //     state.showModal = action.payload.showModal
        //     state.isUpdate = action.payload.isUpdate
        //     state.currentProduct = action.payload.currentProduct
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllOrders.fulfilled, (state, action) => {
                state.orders = action.payload 
            })
            .addCase(getOrderByUser.fulfilled, (state, action) => {
                state.orderByUser = action.payload
            })
            .addCase(createOrder.fulfilled, (state, action) => {
                const newOrders = [...state.orders, action.payload]
                state.orders = newOrders
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                const newOrders = state.orders.filter(item => item._id !== action.payload)
                state.orders = newOrders
            })

    }
});

export const {  } = productSlice.actions;
export default productSlice.reducer;

