
const URL = "https://localhost:44334";

export function getPlacesService() {
    return fetch(URL + '/api/Place')
    .then(response=> response.json());
}


export function getPlaceService(id){
    return fetch(URL + '/api/Place/'+ id)
    .then(response => response.json());
}