const themeToggleBtn = document.getElementById('themeToggleBtn');
const visitCounterDisplay = document.getElementById('visitCounterDisplay');
const contactForm = document.getElementById('contactForm');
const nameInput = document.getElementById('nameInput');
const emailInput = document.getElementById('emailInput');
const formError = document.getElementById('formError');
const todoInput = document.getElementById('todoInput');
const addTodoBtn = document.getElementById('addTodoBtn');
const todoList = document.getElementById('todoList');

let currentProfileTheme = localStorage.getItem('profileTheme') || 'dark';

if (currentProfileTheme === 'light') {
    document.body.classList.remove('dark-theme');
    document.body.classList.add('light-theme');
    themeToggleBtn.textContent = '🌙';
} else {
    document.body.classList.add('dark-theme');
    themeToggleBtn.textContent = '☀️';
}

themeToggleBtn.addEventListener('click', () => {
    if (document.body.classList.contains('dark-theme')) {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        themeToggleBtn.textContent = '🌙';
        localStorage.setItem('profileTheme', 'light');
    } else {
        document.body.classList.remove('light-theme');
        document.body.classList.add('dark-theme');
        themeToggleBtn.textContent = '☀️';
        localStorage.setItem('profileTheme', 'dark');
    }
});

let currentVisitsCount = parseInt(localStorage.getItem('profileVisits') || '0', 10);
currentVisitsCount += 1;
localStorage.setItem('profileVisits', currentVisitsCount.toString());
visitCounterDisplay.textContent = `Посещений: ${currentVisitsCount}`;

let currentTodosArray = JSON.parse(localStorage.getItem('profileTodos')) || [];

function renderTodoList() {
    todoList.innerHTML = '';
    currentTodosArray.forEach((taskString, taskIndex) => {
        const listItem = document.createElement('li');
        listItem.classList.add('fade-in');
        
        const textSpan = document.createElement('span');
        textSpan.textContent = taskString;
        
        const removeBtn = document.createElement('button');
        removeBtn.textContent = '✕';
        removeBtn.classList.add('delete-btn');
        
        removeBtn.addEventListener('click', () => {
            listItem.classList.remove('fade-in');
            listItem.classList.add('fade-out');
            
            setTimeout(() => {
                currentTodosArray.splice(taskIndex, 1);
                localStorage.setItem('profileTodos', JSON.stringify(currentTodosArray));
                renderTodoList();
            }, 350);
        });
        
        listItem.appendChild(textSpan);
        listItem.appendChild(removeBtn);
        todoList.appendChild(listItem);
    });
}

renderTodoList();

addTodoBtn.addEventListener('click', () => {
    const newTaskString = todoInput.value.trim();
    if (newTaskString !== '') {
        currentTodosArray.push(newTaskString);
        localStorage.setItem('profileTodos', JSON.stringify(currentTodosArray));
        todoInput.value = '';
        renderTodoList();
    }
});

todoInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTodoBtn.click();
    }
});

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    formError.textContent = '';
    
    const inputNameValue = nameInput.value.trim();
    const inputEmailValue = emailInput.value.trim();
    
    if (inputNameValue.length < 2) {
        formError.textContent = 'Имя должно содержать минимум 2 символа.';
        return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputEmailValue)) {
        formError.textContent = 'Пожалуйста, введите корректный email адрес.';
        return;
    }
    
    alert('Профиль успешно обновлен!');
    contactForm.reset();
});