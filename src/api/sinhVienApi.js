import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetSinhVien = async () => {
    const { data, status } = await GET_API("sinh-vien/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiSVLogin = async (entity) => {
    const { data, status } = await POST_API("sinh-vien/login", { ...entity });
    if (status !== 200) return [];
    return data;
}
