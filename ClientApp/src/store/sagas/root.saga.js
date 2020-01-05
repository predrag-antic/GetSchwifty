import { all, takeEvery } from 'redux-saga/effects';
import { REQUEST_PLACES } from '../actions/place.actions';
import { fetchPlaces } from './place.saga';
import { REQUEST_BANDS } from '../actions/band.actions';
import { fetchBands } from './band.saga';

export function* rootSaga () {
    yield all (
        [
            takeEvery(REQUEST_PLACES, fetchPlaces),
            takeEvery(REQUEST_BANDS, fetchBands)
        ]
    )
}