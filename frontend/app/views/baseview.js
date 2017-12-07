'use strict';

import EventBus from '../modules/event-bus';
import BackendService from '../services/backend-service';


export default class BaseView {
    constructor(element) {
        this.element = element;
        this.backendService = new BackendService();
        this.eventBus = new EventBus();

        this.isCreated = false;
    }


    destroy() {

    }
}