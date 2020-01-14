import {combineReducers} from "redux";
import {userReducer} from './user.reducer'
import { userInfoReducer } from "./user-info.reducer";
import { routerReducer } from "./router.reducer";
import { placesReducer } from "./places.reducer";
import { bandsReducer } from "./bands.reducer";
import { bandReducer } from "./band.reducer";
import { placeReducer } from "./place.reducer";
import { eventReducer } from "./event.reducer";

 const rootReducer = combineReducers({
    routing: routerReducer,
    current_user:userReducer,
    user_info:userInfoReducer,
    places : placesReducer,
    bands : bandsReducer,
    band : bandReducer,
    place : placeReducer,
    event:eventReducer
})

export default rootReducer;