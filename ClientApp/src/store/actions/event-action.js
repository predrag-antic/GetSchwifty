import { getEventByIdService } from "../../services/service.event";


export const GET_EVENT_SUCCESS = "GET_EVENT_SUCCESS";
export const GET_EVENT_UNSUCCESS = "GET_EVENT_UNSUCCESS";

export function getEventSuccess(event){
    return {
        type: GET_EVENT_SUCCESS,
        event
    }
}

export function getEventUnsuccess(eventId){
    return {
        type: GET_EVENT_UNSUCCESS,
        eventId
    }
}

export const thunk_action_getEventById = eventId => {
    return function(dispatch, getState) {
      return getEventByIdService(eventId).then(response=>{
          if(response.status===200){
              dispatch(getEventSuccess(response.data))
          }else {
              dispatch(getEventUnsuccess(eventId))
          }
      })
    }
  }