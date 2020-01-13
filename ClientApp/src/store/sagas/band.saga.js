import { getBandsService, getBandService, createBandService } from "../../services/band.service";
import { put } from 'redux-saga/effects';
import { getBands, getBandSuccess, createNewBandSuccess } from "../actions/band.actions";


export function* fetchBands() {
    const bands = yield getBandsService();
    yield put(getBands(bands));
}

export function* fetchBand(id) {
    const band = yield getBandService(id.id);
    yield put(getBandSuccess(band));
}

export function* createBand(band){
    const newBand = yield createBandService(band.band);
    yield put(createNewBandSuccess(newBand));
}