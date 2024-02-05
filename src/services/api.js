import {parseConfig} from "./parseConfig";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || '';
const JSON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
};

export async function getConfig(type) {
    const res = await fetch(`${BASE_URL}/config/${type}`);

    const body = await res.json();
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return parseConfig(body.config)
}

export async function getVerifyCode(email, id) {
    const res = await fetch(`${BASE_URL}/verify`, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            email: email,
            id: id
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json()
}

export async function checkVerifyCode(code, id) {
    const res = await fetch(`${BASE_URL}/verify/check`, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            code: code,
            id: id
        }),
    });

    // const body = await res.json();

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json();
}

export async function checkUserStatus(email) {
    const res = await fetch(`${BASE_URL}/user/status/${email}`);

    const body = await res.json();
    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return body
}

export async function saveUser(email, type) {
    const res = await fetch(`${BASE_URL}/user`, {
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            email: email,
            type: type
        }),
    });

    const body = await res.json();

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return body.token
}

export async function getUserId(email) {
    const res = await fetch(`${BASE_URL}/user/${email}`);

    const body = await res.json();
    if (!res.ok) {
        throw new Error(body.message);
    }
    return body;
}

export async function addRefCode(userId, refCode) {
    const res = await fetch(`${BASE_URL}/user/referral`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            refCode: refCode
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json()
}

export async function addPersonalInfo(userId, {...props}) {
    const res = await fetch(`${BASE_URL}/user/personal`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            name: props.name,
            date: props.date,
            citizenship: props.citizenship,
            residence: props.residence,
            docType: props.docType,
            docNumber: props.docNumber,
            addr: props.addr
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json()
}

export async function addProjectInfo(userId, {...props}) {
    const res = await fetch(`${BASE_URL}/user/project`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            addrProject: props.addrProject,
            projectChain: props.projectChain,
            pName: props?.pName,
            pSite: props?.pSite,
            pDesc: props?.pDesc,
            pGh: props?.pGh,
            pTw: props?.pTw,
            pDc: props?.pDc,
            pTg: props?.pTg,
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json()
}


export async function uploadImage(formData, doc) {
    const res = await fetch(`${BASE_URL}/upload/${doc}`, {
        method: 'POST',
        body: formData
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res
}

export async function saveSchedule(userId, date) {
    const res = await fetch(`${BASE_URL}/user/schedule`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${userId}`,
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            date: date,
        })
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res
}
