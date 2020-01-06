import { getBandsService, getBandService } from "../../services/band.service";
import { put } from 'redux-saga/effects';
import { getBands, getBandSuccess } from "../actions/band.actions";


export function* fetchBands() {
    const bands = yield getBandsService();
    yield put(getBands(bands));
}

export function* fetchBand(id) {
    const band = yield getBandService(id.id);
    yield put(getBandSuccess(band));
}
