import { getPlacesService } from "../../services/place.service";
import { getPlaces } from "../actions/place.actions";
import { put } from 'redux-saga/effects';


export function* fetchPlaces() {
    const places = yield getPlacesService();
    yield put(getPlaces(places));
}
