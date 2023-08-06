const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({
            username, 
            password,
        }),
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        console.log('success');
        document.location.replace('/dashboard');
    } else {
        alert('Unable to sign up!');
    }
};

document.querySelector('#signup-form').addEventListener('submit', signupFormHandler);