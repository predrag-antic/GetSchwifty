import { getPlacesService,getPlaceService } from "../../services/place.service";
import { getPlaces, getPlaceSucces } from "../actions/place.actions";
import { put } from 'redux-saga/effects';


export function* fetchPlaces() {
    const places = yield getPlacesService();
    yield put(getPlaces(places));
}

export function* fetchPlace(id) {
    const place = yield getPlaceService(id.id);
    yield put(getPlaceSucces(place));
}
