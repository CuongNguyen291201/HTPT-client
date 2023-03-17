import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUserLogin, apiUserRefreshToken, apiUserRegister } from "../../api/userApi";

const initUserState = {
    name: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
    role: 0,
    cart: [],
    access_token: "",
    refresh_token: ""
}

export const userRefeshToken = createAsyncThunk("user/userRefeshToken", async (token) => {
    const { _user, access_token, refresh_token } = await apiUserRefreshToken(token);
    return { _user, access_token, refresh_token };
})

export const userSlice = createSlice({
    name: "user",
    initialState: initUserState,
    reducers: {
        updateUserInfo: (state, action) => {
            let newUser = action.payload;
            state.name = newUser.name;
            state.email = newUser.email;
        },
        registerUser: (state, action) => {
            let { _user, access_token, refresh_token } = action.payload;
            state.name = _user?.name;
            state.address = _user?.address;
            state.email = _user?.email;
            state.phone = _user?.phone;
            state.avatar = _user?.avatar;
            state.role = _user?.role;
            state.cart = _user?.cart;
            state.access_token = access_token
            state.refresh_token = refresh_token
        },
        loginUser: (state, action) => {
            let { _user, access_token, refresh_token } = action.payload;
            state.name = _user?.name;
            state.address = _user?.address;
            state.email = _user?.email;
            state.phone = _user?.phone;
            state.avatar = _user?.avatar;
            state.role = _user?.role;
            state.cart = _user?.cart;
            state.access_token = access_token
            state.refresh_token = refresh_token
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRefeshToken.fulfilled, (state, action) => {
                let { _user, access_token, refresh_token } = action.payload;
                state.name = _user?.name;
                state.address = _user?.address;
                state.email = _user?.email;
                state.phone = _user?.phone;
                state.avatar = _user?.avatar;
                state.role = _user?.role;
                state.cart = _user?.cart;
                state.access_token = access_token;
                state.refresh_token = refresh_token;
            })
    }
});

export const { updateUserInfo, registerUser, loginUser } = userSlice.actions;
export default userSlice.reducer;