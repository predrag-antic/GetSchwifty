import { POST } from "../constants/methods";
import axios from 'axios';
const URL = "https://localhost:44334";

export function generateRequest(method, url, options={}, headers={}) {
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

export function getPlacesService() {
    return fetch(URL + '/api/Place')
    .then(response=> response.json());
}


export function getPlaceService(id){
    return fetch(URL + '/api/Place/'+ id)
    .then(response => response.json());
}

export function bandPlayInPlace(bandPlayPlace){
    var options = {
        data: bandPlayPlace
    };

    var config = generateRequest(POST, 'api/Place/addBand' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}