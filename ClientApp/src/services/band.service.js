
const URL = "https://localhost:44334";

export function getBandsService() {
    return fetch(URL + '/api/Band')
    .then(response=> response.json());
}
