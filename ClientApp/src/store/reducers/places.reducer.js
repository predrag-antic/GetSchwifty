import { GET_PLACES } from '../actions/place.actions';

const initialState = {
    places: []
}

export function placesReducer( state = initialState, action ){
    switch(action.type){
        case GET_PLACES:
            var places = (action.places);
            return [...places];
        default:
            return state;
    }
}