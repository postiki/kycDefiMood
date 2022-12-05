const BASE_URL = process.env.REACT_APP_API_ENDPOINT || '';
const JSON_HEADERS = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
};

export async function getVerifyCode(email, id){
    const res = await fetch(`${BASE_URL}/verify`,{
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

    const body = await res.json();

    if (!res.ok) {
        throw new Error(res.statusText);
    }

   return body.invalid
}

export async function saveUser(email, refCode){
    const res = await fetch(`${BASE_URL}/user`,{
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            email: email,
            refCode: refCode
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json()
}

export async function addRefCode(email, refCode){
    const res = await fetch(`${BASE_URL}/user/referral`,{
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            email: email,
            refCode: refCode
        }),
    });

    if (!res.ok) {
        throw new Error(res.statusText);
    }

    return res.json()
}

export async function addPersonalInfo(email, {...props}){
    const res = await fetch(`${BASE_URL}/user/info`,{
        method: 'POST',
        headers: JSON_HEADERS,
        body: JSON.stringify({
            email: email,
            name: props.name,
            date: props.date,
            citizenship: props.citizenship,
            residence: props.residence,
            docType: props.docType,
            docNumber: props.docNumber,
            addr: props.addr,
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