export const make_skeleton_endpoint = (resp = {status: 'not implemented'}) =>
    new Promise((resolve, reject) => {resolve(resp)})

const checkError = (res, json) => {
    if (res.status >= 400 || json.error != null) {
        if (json.error) {
            throw new Error(json.error);
        } else {
            throw new Error('Unknown Error');
        }
    } else {
        return json;
    }
}

export const stripSurroundingSlashes =  path => path.replace(/\/+$/, "").replace(/^\/+/, "")

const processResponse = response =>
     Promise.all([response, response.json()])
    .then(([res, json]) => checkError(res, json))

export const post = (endpoint, body = {}) =>
    fetch(
        `${stripSurroundingSlashes(process.env.REACT_APP_INTERNAL_API_ENDPOINT)}/${stripSurroundingSlashes(endpoint)}`,
        {
            method: 'POST',
            'Content-Type': 'application/json',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': process.env.REACT_APP_INTERNAL_API_ENDPOINT,
                'Access-Control-Allow-Credentials': 'true',
                'Accept': 'application/json'
            },
            credentials: 'include',
            withCredentials: 'true',
        }
    ).then(processResponse);