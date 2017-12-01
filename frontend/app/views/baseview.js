'use strict';

import EventBus from '../modules/event-bus';
import UserService from '../services/user-service';


export default class BaseView {
    constructor(element) {
        this.element = element;
        this.userService = new UserService();
        this.eventBus = new EventBus();

        this.isCreated = false;
    }


    destroy() {

    }
}