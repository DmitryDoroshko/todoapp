class Subject {
    constructor() {
        this.subscribers = [];
    }

    subscribe(subscription) {
        this.subscribers.push({sub: subscription});
    }
    next(value) {
        this.subscribers.forEach(({sub}) => sub(value));
    }
}

function fromEvent(target, event) {
    const subj = new Subject();
    target.addEventListener(event, event => subj.next(event));
    return subj;
}

const subj = fromEvent(window, 'click');

subj.subscribe(val => console.log(val));