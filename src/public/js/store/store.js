import Observer from "./observer.js";

export default class Store {
    constructor(reducers) {
        this.reducers = reducers;
        this.state = {
            todos: [],
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