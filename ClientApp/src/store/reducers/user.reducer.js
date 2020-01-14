import { LOGIN_SUCCESS, LOGIN_UNSUCCESS, LOGOUT, GET_USER_SUCCESS_AUTH } from '../actions/auth-actions';
import { FOLLOW_USER_SUCCESS, UNFOLLOW_USER,ADD_FAVORITE_PLACE_SUCCESS,REMOVE_FAVORITE_PLACE,
    ADD_FAVORITE_BAND_SUCCESS,REMOVE_FAVORITE_BAND,ADD_MY_PLACE} from '../actions/user-actions';


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
        case GET_USER_SUCCESS_AUTH:
            var cur_user =(action.user)
            return cur_user
        case LOGIN_SUCCESS:
            var user =(action.user)
            return user
        case LOGIN_UNSUCCESS:
            return null
        case LOGOUT:
            return {...initialState}    
        case FOLLOW_USER_SUCCESS:
            var followedUser=action.followedUser;
            return Object.assign({}, state, {
                followedUsers: [...state.followedUsers,followedUser]
              })
        case UNFOLLOW_USER:
            var followedUserId=action.followedUserId;
               state.followedUsers=state.followedUsers.filter(followedUser=>followedUser.id!==followedUserId);
               return {...state}
        case ADD_FAVORITE_PLACE_SUCCESS:
            var place=action.place;
            return Object.assign({}, state, {
                favoritePlaces: [...state.favoritePlaces,place]
                })
        case REMOVE_FAVORITE_PLACE:
            var placeName=action.placeName;
                state.favoritePlaces=state.favoritePlaces.filter(favPlace=>favPlace.name!==placeName);
                return {...state}
        case ADD_FAVORITE_BAND_SUCCESS:
            var band=action.band;
            return Object.assign({}, state, {
                favoriteBands: [...state.favoriteBands,band]
                })
        case REMOVE_FAVORITE_BAND:
            var bandName=action.bandName;
                state.favoriteBands=state.favoriteBands.filter(favBand=>favBand.name!==bandName);
                return {...state}
        case ADD_MY_PLACE:
            var placeNamee=action.placeName;
            return Object.assign({}, state, {
                myPlaces: [...state.myPlaces,placeNamee]
                })
        default:
            return state;
    }
}