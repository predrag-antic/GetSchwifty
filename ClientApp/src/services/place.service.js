
const URL = "https://localhost:44334";

export function getPlacesService() {
    return fetch(URL + '/api/Place')
    .then(response=> response.json());
}
