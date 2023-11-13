import { DELETE_API, GET_API, POST_API, PUT_API } from "../utils/method";

export const apiGetChiNhanh = async () => {
    const { data, status } = await GET_API("chi-nhanh/get-all", {});
    if (status !== 200) return [];
    return data;
}