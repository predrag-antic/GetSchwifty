import { addReviewService } from '../../services/review.service';
import { addBandReviewSucces, addPlaceReviewSucces } from '../actions/review.actions';
import { put } from 'redux-saga/effects';


export function* postBandReview(review){
    const response = yield addReviewService(review.review);
    yield put(addBandReviewSucces(response));
}

export function* postPlaceReview(review){
    const response = yield addReviewService(review.review);
    yield put(addPlaceReviewSucces(response));
}