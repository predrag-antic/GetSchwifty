export const ADD_REVIEW = "ADD_REVIEW";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";

export function addReview(review) {
    return {
        type: ADD_REVIEW,
        review:review
    }
}

export function addReviewSucces(review) {
    return {
        type: ADD_REVIEW_SUCCESS,
        review:review
    }
}