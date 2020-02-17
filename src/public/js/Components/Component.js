export default class Component {
    constructor(store, anchor) {
        this.anchor = anchor;
        store.events.subscribe('STATE_CHANGE', () => this.render());
    }
}