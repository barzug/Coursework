import BaseView from '../baseview';

export default class ThreadView extends BaseView {
    constructor(parent) {
        super(parent);
    }

    create() {
        let thread_slug = window.location.href.split(`/`)[4]

        this.backendService.threadDetails(thread_slug)
            .then((data) => {
                this.element.innerHTML = this.render(data.slug, data.title, data.description);
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render(slug, title, description) {
        return `
        <form class="form">
        <h2 class="form-heading">Ветка</h2>
        <input name="slug" class="form-control input-top" placeholder="Slug" required="" autofocus="" value="${slug}">
        <input name="title" class="form-control input-base" placeholder="Title" required="" value="${title}">
        <textarea name="description" class="form-control input-bot" rows="3" placeholder="Описание">${description}</textarea>

        <button class="btn btn-lg btn-primary btn-block" type="submit">Изменить</button>
        </form>     
        `
    }
}

