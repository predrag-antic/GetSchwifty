import {combineReducers} from "redux";
import {userReducer} from './user.reducer'
import { userInfoReducer } from "./user-info.reducer";
import { routerReducer } from "./router.reducer";

 const rootReducer = combineReducers({
    routing: routerReducer,
    current_user:userReducer,
    user_info:userInfoReducer
})

export default rootReducer;