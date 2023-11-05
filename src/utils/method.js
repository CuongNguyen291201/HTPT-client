const API_PORT = 8090;

export const POST_API = async (url, reqBody) => {
    let res = await fetch(`http://localhost:${API_PORT}/api/${url}`, {
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

export const PUT_API = async (url, reqBody) => {
    let res = await fetch(`http://localhost:${API_PORT}/api/${url}`, {
        method: "PUT",
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

export const DELETE_API = async (url, reqBody) => {
    let res = await fetch(`http://localhost:${API_PORT}/api/${url}`, {
        method: "DELETE",
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

export const GET_API = async (url, body) => {
    let res = await fetch(`http://localhost:${API_PORT}/api/${url}`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    let data = await res.json();
    let status = res.status;
    return { status, data };
};