'use strict';

export default class EventBus {
    constructor() {
         // используем шаблон проектирования singleton
        if (EventBus.__instance) {
            return EventBus.__instance;
        }

        // создаем карту событий
        this.channels = new Map();

        EventBus.__instance = this;
    }

    // подписка на событие
    on(eventName, callback) {
        let event = this.channels.get(eventName);
        if (!event) {
            this.channels.set(eventName, []);
            event = this.channels.get(eventName);
        }
        event.push(callback);
    }

    // отписка от события
    off(eventName, callback) {
        const event = this.channels.get(eventName);
        if (!event) {
            return;
        }
        event.splice(event.indexOf(callback), 1);
    }

    // запуск события
    emit(eventName, data) {
        const event = this.channels.get(eventName);
        if (!event) {
            return;
        }

        event.forEach(callback => {
            callback(data);
        });
    }
}