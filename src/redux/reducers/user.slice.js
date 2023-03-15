import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiUserRegister } from "../../api/userApi";

const initUserState = {
    name: "",
    email: "",
    address: "",
    phone: "",
    avatar: "",
    role: 0,
    cart: []
}

export const userRegister = createAsyncThunk("user/userRegister", async (user) => {
    const _user = await apiUserRegister(user);
    console.log('_user', _user)
    return _user;
});

export const userSlice = createSlice({
    name: "user",
    initialState: initUserState,
    reducers: { 
        updateUserInfo: (state, action) => {
            let newUser = action.payload;
            state.name = newUser.name;
            state.email = newUser.email;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userRegister.fulfilled, (state, action) => {
                let user = action.payload;
                state.name = user.name;
                state.address = user.address;
                state.email = user.email;
                state.phone = user.phone;
                state.avatar = user.avatar;
                state.role = user.role;
                state.cart = user.cart;
            })
    }
});

export const { updateUserInfo } = userSlice.actions;
export default userSlice.reducer;