import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetQuanLy = async () => {
    const { data, status } = await GET_API("quan-ly/get-all", {});
    if (status !== 200) return [];
    return data;
}

export const apiQLLogin = async (entity) => {
    const { data, status } = await POST_API("quan-ly/login", { ...entity });
    if (status !== 200) return [];
    return data;
}
