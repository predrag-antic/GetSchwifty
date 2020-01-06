/**
 * This action type will be dispatched when your history
 * receives a location change.
 */
import {store} from '../../App'
import { thunk_action_getUserById } from '../actions/user-actions';
export const LOCATION_CHANGE = '@@router/LOCATION_CHANGE'

const initialState = {
    locationBeforeTransitions: null
}

export function routerReducer(state = initialState, action) {
  if (action.type === LOCATION_CHANGE) {
    const pathname=action.payload.pathname;
    const partOfPath=pathname.split("/");
    if(partOfPath[1]==="user"){
       store.dispatch(thunk_action_getUserById(partOfPath[2]))
    }
    return { ...state, locationBeforeTransitions: action.payload }
  }

  return state
}