/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_event_bus__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_user_service__ = __webpack_require__(2);





class BaseView {
    constructor(element) {
        this.element = element;
        this.userService = new __WEBPACK_IMPORTED_MODULE_1__services_user_service__["a" /* default */]();
        this.eventBus = new __WEBPACK_IMPORTED_MODULE_0__modules_event_bus__["a" /* default */]();

        this.isCreated = false;
    }

    destroy() {}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BaseView;


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class Router {
    constructor() {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = new Map();

        Router.__instance = this;
    }

    register(path, view) {
        this.routes.set(path, view);
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

    go(urlPath) {
        let [path, getParamsString] = urlPath.split('?');
        const getParamsObject = getParamsString ? JSON.parse(`{"${getParamsString.replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"')}"}`) : {};

        let view = this.routes.get(path);
        if (!view) {
            view = this.page404;
        }

        if (window.location.pathname !== urlPath) {
            window.history.pushState({}, '', urlPath);
        }

        if (this.current) {
            this.current.destroy();
        }

        view.create(getParamsObject);
        this.current = view;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Router;


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_http__ = __webpack_require__(10);


class UserService {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.host}`;
    }

    signup(email, login, password) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__modules_http__["a" /* default */])(`${this.baseUrl}/signup`, 'POST', { email, login, password });
    }

    login(login, password) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__modules_http__["a" /* default */])(`${this.baseUrl}/signin`, 'POST', { login, password });
    }

    getData() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__modules_http__["a" /* default */])(`${this.baseUrl}/currentUser`, 'GET', {}).then(userdata => {
            return userdata;
        });
    }

    logout() {
        return Object(__WEBPACK_IMPORTED_MODULE_0__modules_http__["a" /* default */])(`${this.baseUrl}/signout`, 'DELETE', {});
    }
}

/* harmony default export */ __webpack_exports__["a"] = (UserService);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__modules_router__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__views_userblockview_auth_authview__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__views_userblockview_unauth_unauthview__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__views_applicationview_applicationview__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__views_mainpageview_mainpage__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__views_formsview_signinview_signinview__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__views_formsview_signupview_signupview__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__views_notfoundview_notfoundview__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_user_service__ = __webpack_require__(2);


function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(__webpack_require__(4));
requireAll(__webpack_require__(6));














const userService = new __WEBPACK_IMPORTED_MODULE_8__services_user_service__["a" /* default */]();

const root = new __WEBPACK_IMPORTED_MODULE_3__views_applicationview_applicationview__["a" /* default */](document.getElementById("root"));
root.create();

const mainBlock = root.getMainBlock();
const topBar = root.getTopBar();

const authUserView = new __WEBPACK_IMPORTED_MODULE_1__views_userblockview_auth_authview__["a" /* default */](topBar);
const unauthUserView = new __WEBPACK_IMPORTED_MODULE_2__views_userblockview_unauth_unauthview__["a" /* default */](topBar);

const mainPageView = new __WEBPACK_IMPORTED_MODULE_4__views_mainpageview_mainpage__["a" /* default */](mainBlock);
const notFoundView = new __WEBPACK_IMPORTED_MODULE_7__views_notfoundview_notfoundview__["a" /* default */](mainBlock);
const signinView = new __WEBPACK_IMPORTED_MODULE_5__views_formsview_signinview_signinview__["a" /* default */](mainBlock);
const signupView = new __WEBPACK_IMPORTED_MODULE_6__views_formsview_signupview_signupview__["a" /* default */](mainBlock);

const router = new __WEBPACK_IMPORTED_MODULE_0__modules_router__["a" /* default */]();

router.setNotFoundPage(notFoundView);

router.register('/', mainPageView).register('/signin', signinView).register('/signup', signupView)
// .register('/create', forumCreateView)
.start();

userService.getData().then(() => authUserView.create()).catch(() => unauthUserView.create());

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./baseview.css": 5
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 4;

/***/ }),
/* 5 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./bootstrap.css": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 6;

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);


class AuthUserView extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);

        this.eventBus.on('user-block:auth', () => {
            this.create();
        });
    }

    create() {
        this.element.innerHTML = this.render();
        // this.authBlockText = this.element.querySelector('.user-block__user-name');
        this.logout = this.element.querySelector('.user-block__button');

        this.logout.addEventListener('click', formdata => {
            event.preventDefault();
            this._logout();
        });
    }

    // _blockText(text) {
    //     this.authBlockText.textContent = text;
    // }

    _logout() {
        this.userService.logout().then(() => {
            this.eventBus.emit('user-block:unauth');
        });
    }

    render() {
        return `<nav>
            <ul class="nav nav-pills float-right">
                <li class="nav-item">
                    <p class="nav-link">Здравствуйте</p>
                </li>
                <li class="nav-item">
                    <a class="nav-link">Выйти</a>
                </li>
            </ul>
        </nav>`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = AuthUserView;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


class EventBus {
    constructor() {
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        this.channels = new Map();

        EventBus.__instance = this;
    }

    on(eventName, callback) {
        let event = this.channels.get(eventName);
        if (!event) {
            this.channels.set(eventName, []);
            event = this.channels.get(eventName);
        }
        event.push(callback);
    }

    off(eventName, callback) {
        const event = this.channels.get(eventName);
        if (!event) {
            return;
        }
        event.splice(event.indexOf(callback), 1);
    }

    emit(eventName, data) {
        const event = this.channels.get(eventName);
        if (!event) {
            return;
        }
        event.forEach(callback => {
            callback(data);
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = EventBus;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Send;
function Send(address, method, body = {}) {
    return fetch(address, {
        method: method,
        mode: 'cors',
        credentials: 'include',
        body: Object.keys(body).length === 0 ? {} : JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        }
    }).then(function (response) {
        let json = response.json();
        if (response.status >= 400) {
            return json.then(response => {
                throw response;
            });
        }
        return json;
    });
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);


class UnauthUserView extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);

        this.eventBus.on('user-block:unauth', () => {
            this.create();
        });
    }

    create() {
        this.element.innerHTML = this.render();
    }

    render() {
        return `<nav>
        <ul class="nav nav-pills float-right">
            <li class="nav-item">
                <a class="nav-link" href="/signin">Войти</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/signup">Зарегистрироваться</a>
            </li>
        </ul>
    </nav>`;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = UnauthUserView;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_router__ = __webpack_require__(1);



class ApplicationView extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);
    }

    create() {
        this.element.innerHTML = this.render();

        this.projectName = this.element.querySelector('.application-name');

        this.projectName.addEventListener('click', formdata => {
            new __WEBPACK_IMPORTED_MODULE_1__modules_router__["a" /* default */]().go('/');
        });

        // .game-name-block__game-name:hover {
        //     color: $game-name-hover;
        //     cursor: pointer;
        //   }
    }

    render() {
        return `
        <header class="header clearfix">
            <div class="user-block">
            </div>
            <h3 class="text-muted application-name">Форумы</h3>
        </header>

        <div class="main-block">
        </div>`;
    }

    getTopBar() {
        return document.querySelector('.user-block');
    }

    getMainBlock() {
        return document.querySelector('.main-block');
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ApplicationView;


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);


class MainPage extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);
    }

    create() {
        this.element.innerHTML = this.render();
    }

    render() {
        return `
        <h1 class="display-3">Создание форумов</h1>
        <p class="lead">текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст 
        текст текст текст текст текст </p>
        <p>
            <a class="btn btn-lg btn-success" href="#" role="button">Создать!</a>
        </p>
    </div>

    <div class="row marketing">
        <div class="col-lg-6">
            <h4>Форум</h4>
            <p>текст текст текст текст текст текст</p>

            <h4>Форум</h4>
            <p>текст текст текст текст текст текст</p>

            <h4>Форум</h4>
            <p>текст текст текст текст текст текст</p> 
        </div>

        <div class="col-lg-6">
        <h4>Форум</h4>
        <p>текст текст текст текст текст текст</p>

        <h4>Форум</h4>
        <p>текст текст текст текст текст текст</p>

        <h4>Форум</h4>
        <p>текст текст текст текст текст текст</p> 
        </div>
        `;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MainPage;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_router__ = __webpack_require__(1);

// import validate from '../../../services/validation/authvalidator';


class SigninView extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);

        this.form = null;
        this.formErrorTextString = null;

        this.formfields = ['login', 'password'];
    }

    render() {
        return `
        <form class="form-signin">
        <h2 class="form-signin-heading">Войдите</h2>
        <input type="nickname" class="form-control input-top" placeholder="Email или логин" required="" autofocus="">
        <input type="password" class="form-control input-bot" placeholder="Пароль" required="">
        <button class="btn btn-lg btn-primary btn-block" type="submit">Войти</button>
    </form>
    `;
    }

    formReset() {
        this.form.reset();
    }

    formError(errorText) {
        this.formErrorTextString.textContent = errorText;
    }

    create() {
        this.element.innerHTML = this.render();
        // this.form = this.element.querySelector('.auth-form__form');
        // this.formErrorTextString = this.element.querySelector('.form__message');

        // this.form.addEventListener('submit', () => {
        //     event.preventDefault();
        //     this._onSubmit();
        // });
    }

    // _onSubmit() {
    //     const formData = {};
    //     const elements = this.form.elements;
    //     for (let field in elements) {
    //         if (elements[field].nodeName === 'INPUT') {
    //             formData[elements[field].name] = elements[field].value;
    //         }
    //     }

    //     const resultValidation = validate(formData.login, formData.password);
    //     if (resultValidation !== null) {
    //         this.formError(resultValidation);
    //         return;
    //     }
    //     this.userService.login(formData.login, formData.password)
    //         .then(() => {
    //             this.formReset();
    //             this.eventBus.emit('user-block:auth');
    //             (new Router()).go('/');
    //         })

    //         .catch((err) => this.formError(err.error));
    // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SigninView;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_router__ = __webpack_require__(1);

// import validate from '../../../services/validation/registrationvalidator';


class SignupView extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);

        this.form = null;
        this.formErrorTextString = null;
    }

    render() {
        return `
        <form class="form-signin">
        <h2 class="form-signin-heading">Зарегистрируйтесь</h2>
        <input type="email" class="form-control input-top" placeholder="Email" required="" autofocus="">
        <input type="nickname" class="form-control input-base" placeholder="Логин" required="">
        <input type="password" class="form-control input-base" placeholder="Пароль" required="">
        <input type="passwordConfirm" class="form-control input-bot" placeholder="Повторите пароль" required="">        			
        <button class="btn btn-lg btn-primary btn-block" type="submit">Зарегистрироваться</button>
    </form>`;
    }

    formReset() {
        this.form.reset();
    }

    formError(errorText) {
        this.formErrorTextString.textContent = errorText;
    }

    create() {
        this.element.innerHTML = this.render();
        // this.form = this.element.querySelector('.registration-form__form');
        // this.formErrorTextString = this.element.querySelector('.form__message');

        // this.form.addEventListener('submit', () => {
        //     event.preventDefault();
        //     this._onSubmit();
        // });
    }

    // _onSubmit() {
    //     const formData = {};
    //     const elements = this.form.elements;
    //     for (let field in elements) {
    //         if (elements[field].nodeName === 'INPUT') {
    //             formData[elements[field].name] = elements[field].value;
    //         }
    //     }

    //     const authValidation = validate(formData.email, formData.login, formData.password, formData.passwordConfirm);
    //     if (authValidation !== null) {
    //         this.formError(authValidation);
    //         return;
    //     }

    //     this.userService.signup(formData.email, formData.login, formData.password)
    //         .then(() => {
    //             this.formReset();
    //             this.eventBus.emit('user-block:auth');
    //             (new Router()).go('/');
    //         })

    //         .catch((err) => this.formError(err.error));
    // }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SignupView;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseview__ = __webpack_require__(0);


class NotFoundView extends __WEBPACK_IMPORTED_MODULE_0__baseview__["a" /* default */] {
    constructor(parent) {
        super(parent);
    }

    create() {
        this.element.innerHTML = this.render();
    }

    render() {
        return `
        </br>
        <H2>Ошибка 404. Страница не существует или была удалена</H2>
        </br>
        <p>
        <a class="btn btn-lg btn-success" href="/" role="button">Вернуться на главную</a>
    </p>`;
    }

}
/* harmony export (immutable) */ __webpack_exports__["a"] = NotFoundView;


/***/ })
/******/ ]);