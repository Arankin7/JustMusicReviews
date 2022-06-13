async function loginFormHandler(event){
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if(email && password){
        const response = await fetch('/api/users/login', {
            method: 'post',
            body: JSON.stringify({
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        });

        if(response.ok){
            console.log('Success');
            document.location.replace('/dashboard');
        }
        else {
            console.log('Error');
            alert(response.statusText);
        }
    }
}

// SIGNUP FORM STILL NEEDS TO BE CREATED IN HANDLEBARS
async function signupFormHandler(event){
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim;
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if(username && email && password){
        const response = await fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username,
                email,
                password
            }),
            headers: { 'Content-Type': 'application/json'}
        })

        // check the response status
        if(response.ok){
            console.log('User Created');
            document.location.replace('/dashboard/');
        }
        else{
            alert(response.statusText)
        }
    }
}

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);