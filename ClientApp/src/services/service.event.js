import axios from 'axios';
import { GET } from '../constants/methods'
import { URL } from '../constants/url'

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


export function getEventByIdService (eventId) {
    var config = generateAuthRequest(GET, `api/Event/${eventId}` , {}, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  
