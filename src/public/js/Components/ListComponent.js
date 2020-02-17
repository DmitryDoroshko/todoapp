import Component from "./Component.js";
import Store from "../store/index-store.js";


export default class ListComponent extends Component {
    constructor() {
        super(Store, document.querySelector('.todo-app__todos-container'));
    }

    render() {
        if (Store.state.todos.length === 0) {
            this.anchor.innerHTML = `No todo's`;
            return;
        }

        this.anchor.innerHTML = `
            ${Store.state.todos.map( todoItem => `
                <li>${todoItem} <button type="button">X</button></li>
            `).join('')}  
        `;

        this.setupListeners();
    }

    setupListeners() {
        this.anchor.querySelectorAll('button').forEach((button, id) => {
            button.addEventListener('click', () => {
                console.log('id is', id);
                Store.dispatch('removeItem', {id});
            })
        });
    }
}