import { GET_BAND_SUCCESS } from "../actions/band.actions";
import { ADD_REVIEW_BAND_SUCCESS } from "../actions/review.actions";

const initialState = {
    name : '',
    phone : '',
    type : '',
    imageUrl  : '',
    bandAvgRating : 0.0,
    numOfRatings : 0,
    bandReviews : []
}

export function bandReducer( state = initialState, action ){
    switch(action.type){
        case GET_BAND_SUCCESS:
            var band = (action.band);
            return band;
        case ADD_REVIEW_BAND_SUCCESS:
            const review = (action.review);
            return Object.assign({}, state, {
                bandReviews: [...state.bandReviews,review]
              });
        default:
            return state;
    }
}