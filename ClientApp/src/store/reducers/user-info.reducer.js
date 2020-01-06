import {Action} from 'redux';
import {GET_USER_SUCCESS, GET_USER_UNSUCCESS} from '../actions/user-actions';

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

export function userInfoReducer(state=initialState,action){
    switch(action.type){
        case GET_USER_SUCCESS:
            var user =(action.user)
            return user  
        case GET_USER_UNSUCCESS:
            return null;      
        default:
            return state;
    }
}