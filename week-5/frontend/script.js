let isSigningUp = false;

// Dom Elements
const signupForm = document.getElementById('signup-form');
const signupUsername = document.getElementById('signup-username');
const signupPassword = document.getElementById('signup-password');
const signupContainer = document.getElementById('signup-container');
const signinContainer = document.getElementById('signin-container');
const signinForm = document.getElementById('signin-form');
const signinUsername = document.getElementById('signin-username');
const signinPassword = document.getElementById('signin-password');
const todoContainer = document.getElementById('todo-container');
const responseMessage = document.getElementById('response-message');

// Signup Form Submission
signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isSigningUp) return;
    isSigningUp = true;

    const username = signupUsername.value;
    const password = signupPassword.value;

    try {
        const response = await fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        const result = await response.json();
        console.log(result)
        isSigningUp = false;

        if (response.ok) {
            responseMessage.innerText = 'Signup successful, please sign in.';
            signupContainer.style.display = 'none';
            signinContainer.style.display = 'block';
        } else {
            responseMessage.innerText = result.message || 'Signup failed, please try again.';
        }
    } catch (error) {
        isSigningUp = false;
        responseMessage.innerText = 'Error during signup.';
    }
});

// Siginin Form Submission
signinForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = signinUsername.value;
    const password = signinPassword.value;

    try {
        const response = await fetch('http://localhost:3000/user/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password })
        });
        const result = await response.json();

        if (response.ok) {
            localStorage.setItem('token', result.token);
            signinContainer.style.display = 'none';
            todoContainer.style.display = 'block';
            responseMessage.innerHTML =
                `Logged in successfully. <a href='#' id='logout-link'>Logout</a>`;

            // Add event listener for the logout link
            document.getElementById('logout-link').addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('token');
                todoContainer.style.display = 'none';
                signinContainer.style.display = 'block';
                responseMessage.innerText = '';
            });
        } else {
            responseMessage.innerText = result.message || 'Signin failed';
        }
    } catch (error) {
        responseMessage.innerText = 'Error during signin';
    }
});