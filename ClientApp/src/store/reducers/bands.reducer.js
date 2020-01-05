import { GET_BANDS } from '../actions/band.actions';

const initialState = {
    bands: []
}

export function bandsReducer( state = initialState, action ){
    switch(action.type){
        case GET_BANDS:
            var bands = (action.bands);
            return [...bands];
        default:
            return state;
    }
}