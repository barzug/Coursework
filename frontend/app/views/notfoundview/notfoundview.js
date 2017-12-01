import BaseView from '../baseview';


export default class NotFoundView extends BaseView {
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
    </p>`
    }

}