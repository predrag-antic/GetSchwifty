import { combineReducers } from "redux";
import { placesReducer } from "./places.reducer";
import { bandsReducer } from "./bands.reducer";
import { bandReducer } from "./band.reducer";
import { placeReducer } from "./place.reducer";

 const rootReducer = combineReducers({
    places : placesReducer,
    bands : bandsReducer,
    band : bandReducer,
    place : placeReducer
})

export default rootReducer;