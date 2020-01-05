import { GET_PLACE_SUCCESS } from "../actions/place.actions";

const initialState = {
    ownerId : '',
        name : '',
        phone : '',
        address : '',
        imageUrl  : '',
        averageRate : 0.0,
        placeBands : [],
        placeReviews : []
}

export function placeReducer( state = initialState, action ){
    switch(action.type){
        case GET_PLACE_SUCCESS:
            var place = (action.place);
            return place;
        default:
            return state;
    }
}