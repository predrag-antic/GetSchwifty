
export const GET_BANDS = 'GET_BANDS';
export const REQUEST_BANDS = "REQUEST_BANDS";
export const GET_BAND = "GET_BAND";
export const GET_BAND_SUCCESS = "GET_BAND_SUCCESS";

export function getBands(bands){
    return {
        type: GET_BANDS,
        bands: bands
    }
}

export function requestBands(){
    return {
        type: REQUEST_BANDS
    }
}

export function getBand(id){
    return {
        type: GET_BAND,
        id: id
    }
}

export function getBandSuccess(band){
    return {
        type: GET_BAND_SUCCESS,
        band: band
    }
}