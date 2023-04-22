import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiDeleteUser, apiGetListUser, apiUserRefreshToken } from "../../api/userApi";

const initUserState = {
    _id: "",
    name: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
    role: 0,
    cart: [],
    access_token: "",
    refresh_token: "",
    listUser: []
}

export const userRefeshToken = createAsyncThunk("user/userRefeshToken", async (token) => {
    const { _user, access_token, refresh_token } = await apiUserRefreshToken(token);
    return { _user, access_token, refresh_token };
})

export const getUsers = createAsyncThunk("user/getUsers", async () => {
    const data = await apiGetListUser();
    return data;
})

export const deleteUser = createAsyncThunk("order/deleteUser", async (userId) => {
    await apiDeleteUser(userId);
    return userId;
})

export const userSlice = createSlice({
    name: "user",
    initialState: initUserState,
    reducers: {
        registerUser: (state, action) => {
            let { _user, access_token, refresh_token } = action.payload;
            // state._id = _user?._id;
            state.name = _user?.name;
            state.address = _user?.address;
            state.email = _user?.email;
            state.phone = _user?.phone;
            state.avatar = _user?.avatar;
            state.role = _user?.role;
            state.cart = _user.cart || [];
            state.access_token = access_token
            state.refresh_token = refresh_token
        },
        loginUser: (state, action) => {
            let { _user, access_token, refresh_token } = action.payload;
            state._id = _user?._id;
            state.name = _user?.name;
            state.address = _user?.address;
            state.email = _user?.email;
            state.phone = _user?.phone;
            state.avatar = _user?.avatar;
            state.role = _user?.role;
            state.cart = _user.cart || [];
            state.access_token = access_token
            state.refresh_token = refresh_token
        },
        logoutUser: (state, action) => {
            state._id = ""
            state.name = ""
            state.address = ""
            state.email = ""
            state.phone = ""
            state.avatar = ""
            state.role = 0
            state.cart = []
            state.access_token = ""
            state.refresh_token = ""
        },
        updateCart: (state, action) => {
            state.cart = action.payload
        },
        updateUserInfo: (state, action) => {
            const _user = action.payload
            state._id = _user?._id;
            state.name = _user?.name;
            state.address = _user?.address;
            state.email = _user?.email;
            state.phone = _user?.phone;
            state.avatar = _user?.avatar;
            state.role = _user?.role;
            state.cart = _user.cart || [];
            // state.access_token = _user.access_token
            // state.refresh_token = _user.refresh_token
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRefeshToken.fulfilled, (state, action) => {
                let { _user, access_token, refresh_token } = action.payload;
                state._id = _user?._id;
                state.name = _user?.name;
                state.address = _user?.address;
                state.email = _user?.email;
                state.phone = _user?.phone;
                state.avatar = _user?.avatar;
                state.role = _user?.role;
                state.cart = _user.cart || [];
                state.access_token = access_token;
                state.refresh_token = refresh_token;
            })
            .addCase(getUsers.fulfilled, (state, action) => {
                state.listUser = action.payload
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                const newUsers = state.listUser.filter(item => item._id !== action.payload)
                state.listUser = newUsers
            })
    }
});

export const { updateUserInfo, registerUser, loginUser, logoutUser, updateCart } = userSlice.actions;
export default userSlice.reducer;