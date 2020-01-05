import { combineReducers } from "redux";
import { placesReducer } from "./places.reducer";
import { bandsReducer } from "./bands.reducer";
import { bandReducer } from "./band.reducer";
import { placeReducer } from "./place.reducer";
import { userReducer } from './user.reducer'

 const rootReducer = combineReducers({
    places : placesReducer,
    bands : bandsReducer,
    band : bandReducer,
    place : placeReducer,
    current_user:userReducer

})

export default rootReducer;