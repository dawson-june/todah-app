const todoForm = document.querySelector(".todo");
const todoInput = document.querySelector(".todo__input");
const todoItemsList = document.querySelector(".todo__items");

let todos = [];
let trashIcons = [];

window.addEventListener('load', function(e) {
    if(localStorage.getItem("todos") != null) {
        todos = retrieveFromLocalStorage();
        renderTodos(todos);
    }
});

window.addEventListener('beforeunload', function(e) {
    e.preventDefault();
    saveToLocalStorage();
});
    

todoForm.addEventListener('submit', function(event) {
    // Prevent the page from reloading when submitting the form.
    event.preventDefault();
    // call the addTodo function with input
    addTodo(todoInput.value);
    saveToLocalStorage();
    retrieveFromLocalStorage();
});

function addTodo(item) {
    if(item != '') {
        const todo = {
            id: Date.now(),
            name: item
        };

        todos.push(todo);
        renderTodos(todos);

        todoInput.value = '';
    }
};

function renderTodos(todos) {
    todoItemsList.innerHTML = '';
    todos.forEach(item => {
        let li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        li.innerHTML = `${item.name} <a class="trash"><i class="fas fa-trash"></i></a>`;
        todoItemsList.append(li);
    }); 
    findTrashIcons();
}

function deleteTodo(item) {
    let id = item.getAttribute("data-key");
    let todoItem = getItemByID(id);
    todos = arrayRemove(todoItem);
    renderTodos(todos);
}

function getItemByID(id) {
    let foundItem;
    todos.forEach(item => {
        if(item.id == id) {
            foundItem = item;
        }
    });
    return foundItem;
}

function arrayRemove(value) {
    return todos.filter(element => {
        return element != value; 
    });
}

function findTrashIcons() {
    let trashIcons = document.querySelectorAll(".trash");
    trashIcons.forEach(item => {
        item.addEventListener('click', function() {
            deleteTodo(item.parentElement);
        });
    });
}

function saveToLocalStorage() {
    console.log(todos);
    localStorage.setItem("todos", JSON.stringify(todos));
}

function retrieveFromLocalStorage() {
    return JSON.parse(localStorage.getItem("todos"));
}
/*

let list = document.querySelector(".list");
let textInput = document.querySelector("#userInput");
let trashicons = document.querySelectorAll(".trash");
let submitButton = document.querySelector(".submit");

let listItem = {
    listElement,
    textField,
    trashbutton,
    
    
}


submitButton.addEventListener('click', testFunction);

trashicons.forEach(icon => {
    icon.addEventListener('click', function() {
        deleteItem(icon.parentElement);
    })
})

function testFunction() {
    console.log(textInput);
    let li = document.createElement("li");
    list.appendChild(li);
    li.innerHTML = `<li class="element">${textInput.value}<a class="trash"><i class="fas fa-trash"></i></a></li>`;
    trashicons.push(li);
};

function deleteItem(itemToRemove) {
    console.log(itemToRemove);
    list.removeChild(itemToRemove);
    
};

*/