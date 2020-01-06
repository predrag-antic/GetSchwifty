const URL = "https://localhost:44334";

export function addReviewService(review){
    const newReview = {
        method: "post",
        body: JSON.stringify(review),
        headers: {'Content-Type':'application/json'}
    };
    return fetch(URL+ '/api/Review', newReview)
    .then(response=>response.json());
}