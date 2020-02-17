import ListComponent from "./Components/ListComponent.js";
import Store from "./store/index-store.js";

let textArea = document.querySelector('.todo-app__add-area__add-todo-textarea');
let addButton = document.querySelector('.todo-app__add-area__add-todo-submit-btn');

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    let value = textArea.value.trim();
    if (value === '') {
        value = 'Todo without text';
    }

    if (value.length) {
        Store.dispatch('addItem', value);
        textArea.focus();
    }
});

const list = new ListComponent();
list.render();
