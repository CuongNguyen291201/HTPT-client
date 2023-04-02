import { POST_API } from "../utils/method";

export const apiGetProducts = async () => {
    const { data, status } = await POST_API("get-products", {});
    if (status !== 200) return [];
    return data;
}

export const apiGetProduct = async (_id) => {
    const { data, status } = await POST_API("get-product", { _id });
    if (status !== 200) return [];
    return data;
}

export const apiCreateProduct = async (product) => {
    const { data, status } = await POST_API("create-product", { product: product });
    if (status !== 200) return [];
    return data;
}

export const apiUpdateProduct = async (product) => {
    const { data, status } = await POST_API("update-product",{ product: product } );
    if (status !== 200) return [];
    return data;
}

export const apiDeleteProduct = async (_id) => {
    const { data, status } = await POST_API("delete-product", { _id });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteImageProduct = async (imageId) => {
    const { data, status } = await POST_API("delete-image-product", { imageId });
    if (status !== 200) return [];
    return data;
}