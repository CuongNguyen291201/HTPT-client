import { POST_API } from "../utils/method";

export const apiGetOrders = async () => {
    const { data, status } = await POST_API("get-all-orders", {});
    if (status !== 200) return [];
    return data;
}

export const apiGetOrdersByUser = async (userId) => {
    const { data, status } = await POST_API("get-order-by-user", { userId: userId });
    if (status !== 200) return null;
    return data;
}

export const apiCreateOrder = async (order) => {
    const { data, status } = await POST_API("create-order", { order });
    if (status !== 200) return null;
    return data;
}

export const apiDeleteOrder = async (orderId) => {
    const { data, status } = await POST_API("delete-order", { orderId });
    if (status !== 200) return null;
    return data;
}

export const apiStatisticOrder = async (startDate, endDate) => {
    const { data, status } = await POST_API("statistic-order", { startDate: startDate, endDate: endDate });
    if (status !== 200) return null;
    return data;
}