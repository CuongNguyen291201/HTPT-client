import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetMonHoc = async () => {
    const { data, status } = await GET_API("mon-hoc/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiCreateMonHoc = async (entity) => {
    const { data, status } = await POST_API("mon-hoc/create", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiUpdateMonHoc = async (entity) => {
    const { data, status } = await PUT_API("mon-hoc/update", { entity: entity });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteMonHoc = async (id) => {
    const { data, status } = await DELETE_API("mon-hoc/delete", { id: id });
    if (status !== 200) return [];
    return data;
}