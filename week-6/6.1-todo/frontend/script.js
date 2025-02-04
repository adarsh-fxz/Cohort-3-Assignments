const API_URL = 'http://localhost:3001/todos';

// Fetch existing todos when the page loads
document.addEventListener('DOMContentLoaded', () => {
    // fetch todos
    fetchTodos();
});

// Fetch todos from backend
async function fetchTodos() {
    //  write here
    try {
        const response = await fetch(API_URL);
        const todos = await response.json();
        todos.forEach(todo => addTodoToDOM(todo));
    } catch (error) {
        console.error('Error fetching todos', error);
    }
}

// Add a new todo to the DOM
function addTodoToDOM(todo) {
    //  write here
    const todoList = document.getElementById('todo-list');

    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    todoItem.setAttribute('data-id', todo.id);

    const title = document.createElement('span');
    title.textContent = todo.task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
        deleteTodo(todo.id);
    });

    todoItem.appendChild(title);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
}

// Add a new todo
document.getElementById('add-todo-btn').addEventListener('click', async () => {
    //  write here
    const titleInput = document.getElementById('todo-input');

    if (!titleInput) {
        console.error('Input not found');
        return;
    }

    const newTodo = { task: titleInput.value };

    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo),
    });

    if (response.ok) {
        const todo = await response.json();
        addTodoToDOM(todo);
        titleInput.value = '';
    } else {
        console.error('Failed to add todo');
    }
});

// Delete a todo
async function deleteTodo(id) {
    // write here  

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const todoItem = document.querySelector(`[data-id='${id}']`);
            todoItem.remove();
        } else {
            console.error('Failed to delete todo');
        }
    } catch (error) {
        console.error('Error deleting todo', error);
    }
}