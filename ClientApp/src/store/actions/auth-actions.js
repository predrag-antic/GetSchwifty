
import {loginUser, getUserByUserIdService} from '../../service/service.user'
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_UNSUCCESS = 'LOGIN_UNSUCCESS';
export const GET_USER_SUCCESS_AUTH = 'GET_USER_SUCCESS_AUTH';

export function logout () {
    return {
        type:LOGOUT
    }
}

export function loginSuccess (user) {
    return {
        type:LOGIN_SUCCESS,
        user
    }
}

export function loginUnsucces () {
    return {
        type:LOGIN_UNSUCCESS
    }
}

export const thunk_action_login = credentials => {
    return function(dispatch, getState) {
      return loginUser(credentials).then(response=>{
          if(response.status===200){
              localStorage.setItem("name", response.data.name);
              localStorage.setItem("id", response.data.id);
              dispatch(loginSuccess(response.data))
          }else {
              dispatch(loginUnsucces())
          }
      })
    }
  }


  export function getUserByIdAuth (user) {
    return {
        type:GET_USER_SUCCESS_AUTH,
        user
    }
}

  export const thunk_action_getUserByIdAuth = userID => {
    return function(dispatch, getState) {
      return getUserByUserIdService(userID).then(response=>{
          if(response.status===200){
              dispatch(getUserByIdAuth(response.data))
          }
      })
    }
  }