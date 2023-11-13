import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetGiangVien = async () => {
    const { data, status } = await GET_API("giang-vien/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiGVLogin = async (entity) => {
    const { data, status } = await POST_API("giang-vien/login", { ...entity });
    if (status !== 200) return [];
    return data;
}
