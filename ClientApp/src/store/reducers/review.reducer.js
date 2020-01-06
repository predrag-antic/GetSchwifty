import { ADD_REVIEW_SUCCESS } from "../actions/review.actions";

const initialState = [];

export function reviewReducers(state = initialState, action) {
    switch(action.type){
        case ADD_REVIEW_SUCCESS:
            const review = (action.review);
            return review;
        default:
            return state;
    }
}