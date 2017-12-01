import BaseView from '../baseview';
import Router from '../../modules/router';




export default class ApplicationView extends BaseView {
    constructor(parent) {
        super(parent);
    }

    create() {
        this.element.innerHTML = this.render();

        this.projectName = this.element.querySelector('.application-name');

        this.projectName.addEventListener('click', (formdata) => {
            (new Router()).go('/');
        });

        // .game-name-block__game-name:hover {
        //     color: $game-name-hover;
        //     cursor: pointer;
        //   }

    }

    render() {
        return `
        <header class="header clearfix">
            <div class="user-block">
            </div>
            <h3 class="text-muted application-name">Форумы</h3>
        </header>

        <div class="main-block">
        </div>`
    }

    getTopBar() {
        return document.querySelector('.user-block');
    }

    getMainBlock() {
        return document.querySelector('.main-block');
    }
}