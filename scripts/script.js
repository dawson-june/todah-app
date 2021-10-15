const todoForm = document.querySelector(".todo");
const todoInput = document.querySelector(".todo__input");
const todoItemsList = document.querySelector(".todo__items");

let todos = [];
let trashIcons = [];

todoForm.addEventListener('submit', function(event) {
    // Prevent the page from reloading when submitting the form.
    event.preventDefault();
    // call the addTodo function with input
    addTodo(todoInput.value);
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
    console.log(todos);
    renderTodos(todos);
}

function getItemByID(id) {
    todos.forEach(item => {
        if(item.id == id) {
            console.log(item);
            return item;
        }
    });
}

function arrayRemove(value) {
    console.log(value);
    return todos.filter(element => {
        console.log(element);
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