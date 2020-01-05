import {store} from "../../App";
import {getUserByUserIdService, followUserService} from '../../service/service.user'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_UNSUCCESS = 'GET_USER_UNSUCCESS';
export const FOLLOW_USER_SUCCESS = 'FOLLOW_USER_SUCCESS';
export const UNFOLLOW_USER = 'UNFOLLOW_USER';

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
              localStorage.setItem("name", response.data.name);
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