import BaseView from '../../baseview';
// import validate from '../../../services/validation/authvalidator';
import Router from '../../../modules/router';


export default class SigninView extends BaseView {
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
    `
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