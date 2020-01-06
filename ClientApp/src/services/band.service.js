
const URL = "https://localhost:44334";

export function generateAuthRequest(method, url, options={}, headers={}) {
    return {
        method: method,
        url: `${URL}/${url}`,
        headers: {
            'Content-Type':'application/json',
            ...headers
        },
        ...options
    }
}


export function getBandsService() {
    return fetch(URL + '/api/Band')
    .then(response=> response.json());
}

export function getBandService(id){
    return fetch(URL + '/api/Band/'+ id)
    .then(response => response.json());
}
