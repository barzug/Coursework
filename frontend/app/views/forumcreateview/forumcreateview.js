import BaseView from '../../baseview';
import validate from '../../../services/validation/registrationvalidator';
import Router from '../../../modules/router';


export default class ForumCreateView extends BaseView {
    constructor(parent) {
        super(parent);

        this.form = null;
        this.formErrorTextString = null;

        this.formfields = ['email', 'login', 'password', 'passwordConfirm'];
    }

    formReset() {
        this.form.reset();
    }

    formError(errorText) {
        this.formErrorTextString.textContent = errorText;
    }


    create() {
        this.element.innerHTML = this.template({});
        this.form = this.element.querySelector('.registration-form__form');
        this.formErrorTextString = this.element.querySelector('.form__message');

        this.form.addEventListener('submit', () => {
            event.preventDefault();
            this._onSubmit();
        });
    }

    _onSubmit() {
        const formData = {};
        const elements = this.form.elements;
        for (let field in elements) {
            if (elements[field].nodeName === 'INPUT') {
                formData[elements[field].name] = elements[field].value;
            }
        }

        const authValidation = validate(formData.email, formData.login, formData.password, formData.passwordConfirm);
        if (authValidation !== null) {
            this.formError(authValidation);
            return;
        }

        this.userService.signup(formData.email, formData.login, formData.password)
            .then(() => {
                this.formReset();
                this.eventBus.emit('user-block:auth');
                (new Router()).go('/');
            })

            .catch((err) => this.formError(err.error));
    }
}