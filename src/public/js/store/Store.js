import Observer from "./Observer.js";

export default class Store {
    constructor(reducers) {
        this.reducers = reducers;
        this.state = {
            todos: ['Do the dishes', 'Cook meal', 'Do homework'],
            allTodosCount: 3,
            completedTodosCount: 0,
            notCompletedTodosCount: 3,
        };
        this.events = new Observer();
    }

    dispatch(actionType, payload) {
        if (this.reducers[actionType]) {
            this.state = this.reducers[actionType](payload, this.state);
            this.events.next('STATE_CHANGE', this.state);
        }
     }
}