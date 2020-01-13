import { GET_BANDS, CREATE_NEW_BAND } from '../actions/band.actions';

const initialState = {
    bands: []
}

export function bandsReducer( state = initialState, action ){
    switch(action.type){
        case GET_BANDS:
            var bands = (action.bands);
            return [...bands];
        case CREATE_NEW_BAND:
            var band = action.band;
            return [...state ,band]
        default:
            return state;
    }
}