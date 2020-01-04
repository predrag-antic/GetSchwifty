import {Action} from 'redux';
import { LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT } from '../actions/auth-actions';

const initialState={
    id: null,
    name: null,
    password: null,
    age: -1,
    isOwner: null,
    gender: null,
    myPlaces: [],
    favoriteBands: [],
    favoritePlaces: [],
    reviewPlaces: [],
    reviewBand: [],
    followedUsers: []
}

export function userReducer(state=initialState,action){
    switch(action.type){
        case LOGIN_SUCCESS:
            var user =(action.user)
            return user
        case LOGIN_UNSUCCESS:
            return null
        case LOGOUT:
            return {...initialState}            
        default:
            return state;
    }
}