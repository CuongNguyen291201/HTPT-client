import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetLopHocPhan = async () => {
    const { data, status } = await GET_API("lop-hoc-phan/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiGetLopHocPhanById = async (entity) => {
    const { data, status } = await POST_API("lop-hoc-phan/get-by-id", { ...entity });
    if (status !== 200) return [];
    return data;
}

export const apiCreateLopHocPhan = async (entity) => {
    const { data, status } = await POST_API("lop-hoc-phan/create", { ...entity });
    if (status !== 200) return [];
    return data;
}

export const apiUpdateLopHocPhan = async (entity) => {
    const { data, status } = await PUT_API("lop-hoc-phan/update", { ...entity });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteLopHocPhan = async (entity) => {
    const { data, status } = await DELETE_API("lop-hoc-phan/delete", { ...entity });
    if (status !== 200) return [];
    return data;
}