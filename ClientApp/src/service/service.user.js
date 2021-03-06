import axios from 'axios';
import { POST, GET } from '../constants/methods'
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

export function registerNewUser (auth) {
    var options = {
        data: auth
    };

    var config = generateAuthRequest(POST, 'api/User/RegisterUser' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  

export function loginUser (credentials) {
    var options = {
        data: credentials
    };

    var config = generateAuthRequest(POST, 'api/User/LoginUser' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  

export function getUserByUserIdService (userId) {
    var config = generateAuthRequest(GET, `api/User/${userId}` , {}, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  

export function followUserService(userIds) {
    var options = {
        data: userIds
    };

    var config = generateAuthRequest(POST, `api/User/FollowUser` , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function addFavoritePlaceService(userIdPlaceName) {
    var options = {
        data: userIdPlaceName
    };

    var config = generateAuthRequest(POST, `api/User/AddFavoritePlace` , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function addFavoriteBandService(userIdBandName) {
    var options = {
        data: userIdBandName
    };

    var config = generateAuthRequest(POST, `api/User/AddFavoriteBand` , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}

export function createNewPlace (place) {
    var options = {
        data: place
    };

    var config = generateAuthRequest(POST, 'api/Place/create' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  

export function createNewEvent (event) {
    var options = {
        data: event
    };

    var config = generateAuthRequest(POST, 'api/Event/' , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}  

export function userGoingToEventService(userIdEventId) {
    var options = {
        data: userIdEventId
    };

    var config = generateAuthRequest(POST, `api/Event/userGoingTo` , options, {});
    return axios(config)
    .then( response => response)
    .catch((errorMessage) => {
        return errorMessage
    });
}