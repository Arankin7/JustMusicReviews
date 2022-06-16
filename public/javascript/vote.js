async function voteBtnHandler (event) {
    event.preventDefault();

    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];
    const response = await fetch('/api/reviews/upvotes', {
        method: 'PUT',
        body: JSON.stringify({
            review_id: id
        }),
        headers: { 'Content-Type': 'application.json' }
    });
    if(response.ok) {
        document.location.reload();
    }else{
        alert(response.statusText);
    }
}

document.querySelector('.vote-btn').addEventListener('click', voteBtnHandler);