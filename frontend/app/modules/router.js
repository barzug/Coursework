'use strict';

export default class Router {
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.push({ path: path, view: view });
        return this;
    }

    setNotFoundPage(view) {
        this.page404 = view;
    }

    start() {
        window.onpopstate = event => {
            this.go(window.location.pathname);
        };

        document.body.addEventListener('click', event => {
            if (event.target.tagName.toLowerCase() !== 'a') {
                return;
            }
            if (event.target.getAttribute('target') === '_blank') {
                return;
            }
            event.preventDefault();
            const pathname = event.target.pathname;
            this.go(pathname);
        });

        this.go(window.location.pathname);
    }

    go(route) {
        this.routes.find(info => {
            if (!info.path.test(route)) {
                return false;
            }

            if (window.location.pathname !== route) {
                window.history.pushState({}, '', route);
            }

            if (this.current) {
                this.current.destroy();
            }

            info.view.create();
            this.currentView = info.view;

            return true;
        });
    }
}