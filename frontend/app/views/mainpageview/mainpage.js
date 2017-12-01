import BaseView from '../baseview';

export default class MainPage extends BaseView {
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
        `
    }
}

