export const apiGetWebSeo = async () => {
    const { data, status } = await GET_API("/get-all-web-seos");
    if (status !== 200) return [];
    return data;
}

export const apiCreateWebSeo = async (args) => {
    const { data, status } = await POST_API("/submit-web-seo", args);
    if (status !== 200) return [];
    return data;
}

export const apiUpdateWebSeo = async (args) => {
    const { data, status } = await POST_API("/update-web-seo", { webSeo: args });
    if (status !== 200) return [];
    return data;
}

export const apiDeleteWebSeo = async (_id) => {
    const { data, status } = await POST_API("/delete-web-seo", { _id });
    if (status !== 200) return [];
    return data;
}