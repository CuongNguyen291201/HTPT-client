import { GET_API, POST_API } from "../utils/method";

export const apiUserRegister = async (user) => {
    const { data, status } = await POST_API("register", { user: user });
    if (status !== 200) return {};
    return data;
}

export const apiUserLogin = async (user) => {
    const { data, status } = await POST_API("login", { user: user });
    if (status !== 200) return {};
    return data;
}

export const apiUserLogout = async () => {
    const { data, status } = await POST_API("logout", {});
    if (status !== 200) return false;
    return data
}

export const apiUserRefreshToken = async (token) => {
    const { data, status } = await POST_API("refresh_token", { token: token });
    if (status !== 200) return {};
    return data;
}

export const apiUpdateCart = async (cart) => {
    const { data, status } = await POST_API("add-cart", { cart: cart });
    if (status !== 200) return {};
    return data;
}