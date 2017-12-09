import BaseView from '../baseview';
import Router from '../../modules/router';


export default class ForumCreateView extends BaseView {
    constructor(parent) {
        super(parent);

        this.form = null;
    }

    render() {
        return `
        <form class="form">
        <h2 class="form-heading">Создайте форум</h2>
        <input name="slug" class="form-control input-top" placeholder="Slug" required="" autofocus="">
        <input name="title" class="form-control input-base" placeholder="Title" required="">
        <textarea name="description" class="form-control input-bot" rows="3" placeholder="Описание"></textarea>

        <button class="btn btn-lg btn-primary btn-block" type="submit">Создать!</button>
    </form>`
    }


    formReset() {
        this.form.reset();
    }


    create() {
        this.element.innerHTML = this.render();
        this.form = this.element.querySelector('.form');
        // this.formErrorTextString = this.element.querySelector('.form__message');

        this.form.addEventListener('submit', () => {
            event.preventDefault();
            this._onSubmit();
        });
    }

    _onSubmit() {
        const formData = {};
        const elements = this.form.elements;
        for (let field in elements) {
            if (elements[field].nodeName === 'INPUT' || elements[field].nodeName === 'TEXTAREA') {
                formData[elements[field].name] = elements[field].value;
            }
        }

        let delete_message = this.element.querySelector('.delete_message').checked;


        debugger;
        this.backendService.forumCreate(formData.slug, formData.title, "admin", +formData.vote_type, delete_message, formData.description)
            .then(() => {
                this.formReset();
                (new Router()).go('/');
            })

            .catch((err) => this.formError(err.error));
    }
}