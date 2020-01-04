import {combineReducers} from "redux";
import {userReducer} from './user.reducer'

 const rootReducer = combineReducers({
    current_user:userReducer
})

export default rootReducer;