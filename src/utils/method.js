export const POST_API = async (url, reqBody) => {
    let res = await fetch(`http://localhost:5000/api/${url}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(reqBody),
    });
    let data = await res.json();
    let status = res.status;
    if (status !== 200) {
        console.error(url, "status", status, " error ", data);
    }
    return { status, data };
};

export const GET_API = async (url) => {
    let res = await fetch(`http://localhost:5000/api/${url}`);
    let data = await res.json();
    let status = res.status;
    return { status, data };
};