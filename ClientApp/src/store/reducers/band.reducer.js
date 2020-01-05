import { GET_BAND_SUCCESS } from "../actions/band.actions";

const initialState = {
    name : '',
    phone : '',
    type : '',
    imageUrl  : '',
    bandAvgRating : 0.0,
    numOfRatings : 0,
    bandeReviews : []
}

export function bandReducer( state = initialState, action ){
    switch(action.type){
        case GET_BAND_SUCCESS:
            var band = (action.band);
            return band;
        default:
            return state;
    }
}