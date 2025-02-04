let isSigningUp = false;
let isAddingTodo = false;

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
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const showSignin = document.getElementById('show-signin');
const showSignup = document.getElementById('show-signup');

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
            loadTodos();

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

// Adding Todo on Form Submission
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (isAddingTodo) return;
    isAddingTodo = true;

    const todoText = todoInput.value.trim();
    if (!todoText) {
        isAddingTodo = false;
        return;
    }

    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/todo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ title: todoText }),
        });
        const result = await response.json();
        isAddingTodo = false;

        if (response.ok) {
            todoInput.value = '';
            loadTodos();
        } else {
            console.error(result.message);
        }
    } catch (error) {
        isAddingTodo = false;
        console.error('Error during adding todo:', error);
    }
});

// Load Todos
async function loadTodos() {
    const token = localStorage.getItem('token');

    try {
        const response = await fetch('http://localhost:3000/todo', {
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        const { todos } = await response.json();
        todoList.innerHTML = '';

        todos.forEach((todo) => {
            const li = document.createElement('li');
            li.textContent = todo.title;

            if (todo.completed) {
                li.style.textDecoration = 'line-through';
            }

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.onclick = () => {
                completeTodo(todo._id, !todo.completed);
            };

            if (!todo.completed) {
                li.appendChild(completeButton);
            }

            todoList.appendChild(li);
        });
    } catch (error) {
        console.error('Error loading todos:', error);
    }
}

// Complete Todo
async function completeTodo(id, completed) {
    const token = localStorage.getItem('token');
    try {
        await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ completed }),
        });
        loadTodos();
    } catch (error) {
        console.error('Error completing todo:', error);
    }
}

// Toggle between Signup and Signin
showSignin.addEventListener('click', (e) => {
    e.preventDefault();
    signupContainer.style.display = 'none';
    signinContainer.style.display = 'block';
});

showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signinContainer.style.display = 'none';
    signupContainer.style.display = 'block';
});