import BaseView from '../../baseview';
// import validate from '../../../services/validation/registrationvalidator';
import Router from '../../../modules/router';


export default class SignupView extends BaseView {
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
    </form>`
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