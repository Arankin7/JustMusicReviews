async function editFormHandler(event) {
    event.preventDefault();
  
    const title = document.querySelector('input[name="review-title"]').value;
    const review_text = document.querySelector('input[name="review-content"]').value;
    const id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
      ];

    console.log(title, review_text);
  
    const response = await fetch(`/api/reviews/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            title,
            review_text
        }),
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
  }
  
  document.querySelector('.edit-review-form').addEventListener('submit', editFormHandler);