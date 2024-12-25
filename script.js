// DOM Elements
const todoInput = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const todoList = document.getElementById('todo-list');
const clearBtn = document.getElementById('clear-btn');

// Initialize list
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render ToDo List
function renderTodos() {
  todoList.innerHTML = '';
  todos.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = todo.completed ? 'completed' : '';
    li.innerHTML = `
      <span>${todo.text}</span>
      <div>
        <input type="checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
        <button data-index="${index}">Delete</button>
      </div>
    `;
    todoList.appendChild(li);
  });
}

// Add ToDo
addBtn.addEventListener('click', () => {
  const text = todoInput.value.trim();
  if (text) {
    todos.push({ text, completed: false });
    todoInput.value = '';
    saveAndRender();
  }
});

// Toggle Complete
todoList.addEventListener('change', (e) => {
  if (e.target.type === 'checkbox') {
    const index = e.target.dataset.index;
    todos[index].completed = e.target.checked;
    saveAndRender();
  }
});

// Delete ToDo
todoList.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    todos.splice(index, 1);
    saveAndRender();
  }
});

// Clear List
clearBtn.addEventListener('click', () => {
  todos = [];
  saveAndRender();
});

// Save to LocalStorage and Render
function saveAndRender() {
  localStorage.setItem('todos', JSON.stringify(todos));
  renderTodos();
}

// Initial Render
renderTodos();
