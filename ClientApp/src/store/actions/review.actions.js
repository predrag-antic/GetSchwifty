export const ADD_REVIEW_BAND = "ADD_REVIEW_BAND";
export const ADD_REVIEW_BAND_SUCCESS = "ADD_REVIEW_BAND_SUCCESS";
export const ADD_REVIEW_PLACE = "ADD_REVIEW_PLACE";
export const ADD_REVIEW_PLACE_SUCCESS = "ADD_REVIEW_PLACE_SUCCESS";

export function addBandReview(review) {
    return {
        type: ADD_REVIEW_BAND,
        review:review
    }
}

export function addBandReviewSucces(review) {
    return {
        type: ADD_REVIEW_BAND_SUCCESS,
        review:review
    }
}

export function addPlaceReview(review) {
    return {
        type: ADD_REVIEW_PLACE,
        review:review
    }
}

export function addPlaceReviewSucces(review) {
    return {
        type: ADD_REVIEW_PLACE_SUCCESS,
        review:review
    }
}