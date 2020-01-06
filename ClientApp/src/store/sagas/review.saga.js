import { addReviewService } from '../../services/review.service';
import { addReviewSucces } from '../actions/review.actions';
import { put } from 'redux-saga/effects';


export function* postReview(review){
    const response = yield addReviewService(review.review);
    yield put(addReviewSucces(response));
}