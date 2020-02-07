class Component {
    get dom() {
        this.anchor.innerHTML = this.render();
        this.setupListeners();
        return this.anchor;
    }
}

class LoginComponent extends Component {
    constructor(anchor) {
        super();
        this.anchor = document.createElement('div');
    }

    onInit() {
        console.log('LoginComponent init');
    }

    render() {
        return `
            <form>
                <h1>Login</h1> 
                <input type="text" name="login"/>
                <input type="password" name="password"/>
                <button type="submit">Submit</button>
            </form>
        `;
    }

    setupListeners() {
        this.anchor.querySelector('button[type="submit"]')
            .addEventListener('click', (event) => {
                event.preventDefault();
                window.dispatchEvent(new CustomEvent('changeRoute',  { detail : {
                        route: 'dashboard'
                    }}));
            });
    }
}

class DashboardComponent extends Component {
    constructor(anchor) {
        super();
        this.anchor = document.createElement('div');
    }

    onInit() {
        console.log('Dashboard init');
    }

    render() {
        return `
            <h1>Dashboard</h1>
        `;
    }

    setupListeners() {
        this.anchor.addEventListener('click', (event) => {
           console.log('clicked!!!');
        });
    }

}

const routerConfig = {
    'login': {
        data: {route:'login'},
        url: 'login',
        component: LoginComponent,
    },
    'dashboard' : {
        data: {route: 'dashboard'},
        url: 'dashboard',
        component: DashboardComponent,
    }
}


class Router {
    constructor(anchor) {
        this.anchor = anchor;
        window.addEventListener('popstate', event => {
            this.changeRoute(event.state.route);
        });
    }

    changeRoute(route) {
        const conf = routerConfig[route];

        if (!conf) return;
        window.history.pushState(conf.data, "MyTitle", conf.url);

        const component = new conf.component();
        component.onInit();


        const dom = component.dom;
        if (this.currentDomComponent) {
            this.anchor.innerHTML = '';
            this.anchor.appendChild(dom);
            this.currentDomComponent = dom;
        } else {
            this.anchor.appendChild(dom);
            this.currentDomComponent = dom;
        }
    }

}

const router = new Router(document.body);

window.addEventListener('changeRoute', event => {
    router.changeRoute(event.detail.route);
});

window.dispatchEvent(new CustomEvent('changeRoute',  { detail : {
        route: 'login'
    }}));

