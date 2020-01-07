import { GET_PLACE_SUCCESS } from "../actions/place.actions";
import { ADD_REVIEW_PLACE_SUCCESS } from "../actions/review.actions";

const initialState = {
    ownerId : '',
        name : '',
        phone : '',
        address : '',
        imageUrl  : '',
        averageRate : '',
        placeBands : [],
        placeReviews : []
}

export function placeReducer( state = initialState, action ){
    switch(action.type){
        case GET_PLACE_SUCCESS:
            var place = (action.place);
            return place;
        case ADD_REVIEW_PLACE_SUCCESS:
            const review = (action.review);
            return Object.assign({}, state, {
                placeReviews: [...state.placeReviews,review]
              });
        default:
            return state;
    }
}