async function newReviewHandler(event){
    event.preventDefault();

    const title = document.querySelector('input[name="review-title"]').value;
    const rating = document.querySelector('input[name="review-rating"]:checked').value;
    const review_text = document.querySelector('textarea[name="review-text"]').value;

    console.log(title, rating, review_text);

    const response = await fetch('/api/reviews', {
        method: 'post',
        body: JSON.stringify({
            title,
            rating,
            review_text
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok){
        document.location.replace('/dashboard');
    }
    else{
        alert(response.statusText);
    }
}

document.querySelector('.new-review-form').addEventListener('submit', newReviewHandler);