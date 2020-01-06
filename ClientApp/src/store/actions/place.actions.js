import {addFavoritePlaceService} from '../../services/place.service'
export const GET_PLACES = 'GET_PLACES';
export const REQUEST_PLACES = "REQUEST_PLACES";
export const GET_PLACE = "GET_PLACE";
export const GET_PLACE_SUCCESS = "GET_PLACE_SUCCESS";


export function getPlaces(places){
    return {
        type: GET_PLACES,
        places: places
    }
}

export function requestPlaces(){
    return {
        type: REQUEST_PLACES
    }
}

export function getPlace(id){
    return {
        type: GET_PLACE,
        id: id
    }
}

export function getPlaceSucces(place){
    return {
        type: GET_PLACE_SUCCESS,
        place: place
    }
}
