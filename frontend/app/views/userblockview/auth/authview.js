import BaseView from '../../baseview';


export default class AuthUserView extends BaseView {
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

        this.logout.addEventListener('click', (formdata) => {
            event.preventDefault();
            this._logout();
        });
    }

    // _blockText(text) {
    //     this.authBlockText.textContent = text;
    // }

    _logout() {
        this.userService.logout()
            .then(() => {
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
        </nav>`
    }
}