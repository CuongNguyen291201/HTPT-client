import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetChuyenNganh = async () => {
    const { data, status } = await GET_API("chuyen-nganh/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiCreateChuyenNganh = async (entity) => {
    const { data, status } = await POST_API("chuyen-nganh/create", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiUpdateChuyenNganh = async (entity) => {
    const { data, status } = await PUT_API("chuyen-nganh/update", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteChuyenNganh = async (id) => {
    const { data, status } = await DELETE_API("chuyen-nganh/delete", { id: id });
    if (status !== 200) return [];
    return data;
}