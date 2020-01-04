
import {store} from "../../App";
import {loginUser} from '../../service/service.user'
export const LOGOUT = 'LOGOUT';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_UNSUCCESS = 'LOGIN_UNSUCCESS';

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
              dispatch(loginSuccess(response.data))
          }else {
              dispatch(loginUnsucces())
          }
      })
    }
  }