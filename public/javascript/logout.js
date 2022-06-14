async function logout(){
    const response = await fetch('/api/users/logout', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok){
        document.location.replace('/');
    }
    else{
        alert(response.statusText);
    }
}

// LISTENING FOR A 'CLICK' ON THE LOGOUT BUTTON
document.querySelector('#logout').addEventListener('click', logout);