import {getUserByUserIdService, 
    followUserService,
    addFavoritePlaceService,
    addFavoriteBandService
} from '../../service/service.user'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_UNSUCCESS = 'GET_USER_UNSUCCESS';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';
export const ADD_FAVORITE_PLACE_SUCCESS = "ADD_FAVORITE_PLACE_SUCCESS";
export const REMOVE_FAVORITE_PLACE = "REMOVE_FAVORITE_PLACE";
export const ADD_FAVORITE_BAND_SUCCESS = "ADD_FAVORITE_BAND_SUCCESS";
export const REMOVE_FAVORITE_BAND = "REMOVE_FAVORITE_BAND";
export const ADD_MY_PLACE = "ADD_MY_PLACE";

export function getUserByUserId (user) {
    return {
        type:GET_USER_SUCCESS,
        user
    }
}

export function getUserByUserIdUnsuccess () {
    return {
        type:GET_USER_UNSUCCESS
    }
}


export const thunk_action_getUserById = userID => {
    return function(dispatch, getState) {
      return getUserByUserIdService(userID).then(response=>{
          if(response.status===200){
              dispatch(getUserByUserId(response.data))
          }else {
              dispatch(getUserByUserIdUnsuccess())
          }
      })
    }
  }


  export function followUserSuccess (followedUser) {
    return {
        type:FOLLOW_USER_SUCCESS,
        followedUser
    }
}

export function unfollowUser (followedUserId) {
    return {
        type:UNFOLLOW_USER,
        followedUserId
    }
}

export const thunk_action_followUser = userIds => {
    return function(dispatch, getState) {
      return followUserService(userIds).then(response=>{
          if(response.status===200){
              dispatch(followUserSuccess(response.data))
          }else {
              dispatch(unfollowUser(userIds.followedUserId))
          }
      })
    }
  }

  export function addFavoritePlaceSuccess(place){
    return {
        type: ADD_FAVORITE_PLACE_SUCCESS,
        place
    }
}

export function removeFavoritePlace(placeName){
    return {
        type: REMOVE_FAVORITE_PLACE,
        placeName
    }
}

export const thunk_action_addPlaceToFavorite = userIdPlaceName => {
    return function(dispatch, getState) {
      return addFavoritePlaceService(userIdPlaceName).then(response=>{
          if(response.status===200){
              dispatch(addFavoritePlaceSuccess(response.data))
          }else {
              dispatch(removeFavoritePlace(userIdPlaceName.name))
          }
      })
    }
  }

//////////////ADD/REMOVE FAVORITE BAND////////////////////////////////////


export function addFavoriteBandSuccess(band){
    return {
        type: ADD_FAVORITE_BAND_SUCCESS,
        band
    }
}

export function removeFavoriteBand(bandName){
    return {
        type: REMOVE_FAVORITE_BAND,
        bandName
    }
}

export const thunk_action_addBandToFavorite = userIdBandName => {
    return function(dispatch, getState) {
      return addFavoriteBandService(userIdBandName).then(response=>{
          if(response.status===200){
              dispatch(addFavoriteBandSuccess(response.data))
          }else {
              dispatch(removeFavoriteBand(userIdBandName.name))
          }
      })
    }
  }

  //////////////////ADD_MY_PLACE////////////////

  export function addPlaceToMyPlaces(placeName){
    return {
        type: ADD_MY_PLACE,
        placeName
    }
}