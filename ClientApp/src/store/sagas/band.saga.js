import { getBandsService } from "../../services/band.service";
import { put } from 'redux-saga/effects';
import { getBands } from "../actions/band.actions";


export function* fetchBands() {
    const bands = yield getBandsService();
    yield put(getBands(bands));
}
