import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetDangKy = async () => {
    const { data, status } = await GET_API("dang-ky/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiGetDangKyById = async (entity) => {
    const { data, status } = await POST_API("dang-ky/get-by-id", { ...entity });
    if (status !== 200) return [];
    return data;
}

export const apiCreateDangKy = async (entity) => {
    const { data, status } = await POST_API("dang-ky/create", { ...entity });
    if (status !== 200) return [];
    return data;
}

export const apiUpdateDangKy = async (entity) => {
    const { data, status } = await PUT_API("dang-ky/update", { ...entity });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteDangKy = async (entity) => {
    const { data, status } = await DELETE_API("dang-ky/delete", { ...entity });
    if (status !== 200) return [];
    return data;
}