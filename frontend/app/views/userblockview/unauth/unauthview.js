import BaseView from '../../baseview';

export default class UnauthUserView extends BaseView {
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
    </nav>`
    }
}