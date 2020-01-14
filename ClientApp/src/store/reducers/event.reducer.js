import { GET_EVENT_SUCCESS } from "../actions/event-action";
import { GET_EVENT_UNSUCCESS } from "../actions/event-action";

const initialState = {
    id : -1,
    name : '',
    topic : '',
    description  : '',
    time : '',
    imageUrl : '',
    placeName : '',
    listOfSponsors:[],
    usersGoingTo:[]
}

export function eventReducer( state = initialState, action ){
    switch(action.type){
        case GET_EVENT_SUCCESS:
            var event = action.event
            return {...event};
        case GET_EVENT_UNSUCCESS:
            const eventId = action.eventId
            return null
        default:
            return state;
    }
}