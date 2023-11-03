import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUserRefreshToken } from "../../api/userApi";

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
    }
});

export const { updateUserInfo, registerUser, loginUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;