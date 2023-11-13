import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetLichHoc = async () => {
    const { data, status } = await GET_API("lich-hoc/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiGetDangKyById = async (entity) => {
    const { data, status } = await POST_API("lich-hoc/get-by-id", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiCreateLichHoc = async (entity) => {
    const { data, status } = await POST_API("lich-hoc/create", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiUpdateLichHoc = async (entity) => {
    const { data, status } = await PUT_API("lich-hoc/update", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteLichHoc = async (entity) => {
    const { data, status } = await DELETE_API("lich-hoc/delete", { entity: entity });
    if (status !== 200) return [];
    return data;
}