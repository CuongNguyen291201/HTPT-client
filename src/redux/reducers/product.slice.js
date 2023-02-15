import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

const initWebSeoState = {
    products: [],
    mapWebSeo: {},
    currentProduct: {},
    showModal: false,
    isUpdate: false
}

export const fetchWebSeo = createAsyncThunk("webSeo/fetchWebSeo", async () => {
    const webSeo = await apiGetWebSeo();
    return webSeo;
})

export const createWebSeo = createAsyncThunk("webSeo/createWebSeo", async (args) => {
    const { webSeo, showModal } = args;
    const _webSeo = await apiCreateWebSeo(webSeo);
    return {
        _webSeo,
        showModal
    };
})

export const updateWebSeo = createAsyncThunk("webSeo/updateWebSeo", async (args) => {
    const { webSeo, showModal } = args;
    const webSeoUpdate = await apiUpdateWebSeo(webSeo);
    return {
        webSeoUpdate,
        showModal
    };
})

export const deleteWebSeo = createAsyncThunk("webSeo/deleteWebSeo", async (_id) => {
    await apiDeleteWebSeo(_id);
    return _id;
})

export const webSeoSlice = createSlice({
    name: "webSeo",
    initialState: initWebSeoState,
    reducers: {
        showModal: (state, action) => {
            state.showModal = action.payload.showModal
            state.isUpdate = action.payload.isUpdate
            state.currentWebSeo = action.payload.currentWebSeo
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWebSeo.fulfilled, (state, action) => {
                state.webSeo = action.payload
                state.mapWebSeo = action.payload.reduce((map, item) => {
                    const { appId } = item;
                    map[appId] = [...(map[appId] || []), item]
                    return map;
                }, {})
            })
            .addCase(createWebSeo.fulfilled, (state, action) => {
                const newWebSeo = [...state.webSeo, action.payload._webSeo]
                state.webSeo = newWebSeo
                state.showModal = action.payload.showModal
                state.mapWebSeo = newWebSeo.reduce((map, item) => {
                    const { appId } = item;
                    map[appId] = [...(map[appId] || []), item]
                    return map;
                }, {})
            })
            .addCase(updateWebSeo.fulfilled, (state, action) => {
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
            .addCase(deleteWebSeo.fulfilled, (state, action) => {
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

export const { showModal } = webSeoSlice.actions;
export default webSeoSlice.reducer;

