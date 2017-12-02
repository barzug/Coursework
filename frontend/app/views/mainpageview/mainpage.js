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
            <a class="btn btn-lg btn-success" href="/createforum" role="button">Создать!</a>
        </p>
    </div>

    <div class="row marketing">
    <div class="col-lg-12">
        <div class="card mb-3">
            <div class="card-body">
                <h4 class="card-title">Название</h4>
                <h6 class="card-subtitle mb-2 text-muted">slug</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#">Подробнее</a>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h4 class="card-title">Название</h4>
                <h6 class="card-subtitle mb-2 text-muted">slug</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#">Подробнее</a>
            </div>
        </div>
        <div class="card mb-3">
            <div class="card-body">
                <h4 class="card-title">Название</h4>
                <h6 class="card-subtitle mb-2 text-muted">slug</h6>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#">Подробнее</a>
            </div>
        </div>
    </div>

</div>
        `
    }

    renderForum(title, slug, description) {`
    <div class="card mb-3">
    <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <h6 class="card-subtitle mb-2 text-muted">${slug}</h6>
        <p class="card-text">${description}</p>
        <a href="/forum/${slug}">Подробнее</a>
    </div>
</div>`
        
    }
}

