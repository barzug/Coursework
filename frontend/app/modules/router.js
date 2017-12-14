'use strict';
export default class Router {
    constructor() {
        /// используем шаблон проектирования singleton
        if (Router.__instance) {
            return Router.__instance;
        }

        // создаем массив маршрутов 
        //(они будут храниться в виде регулярных выражений)
        this.routes = [];

        Router.__instance = this;
    }

    // добавляем маршрут и отображение по этому маршруту
    register(path, view) {
        this.routes.push({ path: path, view: view });
        return this;
    }

    // добавляем страницу "Не найдено"
    setNotFoundPage(view) {
        this.page404 = view;
    }

    // приводит класс в действие
    start() {

        // добавляем обработчик на изменение адресной строки браузера
        window.onpopstate = event => {
            this.go(window.location.pathname);
        };

        // добавляет обработчик на нажатие на ссылки на странице
        document.body.addEventListener('click', event => {
            if (event.target.tagName.toLowerCase() !== 'a') {
                return;
            }

            // если страница должна открыться в новом окне то ничего не делаем
            if (event.target.getAttribute('target') === '_blank') {
                return;
            }

            // останавливаем события по умолчанию
            event.preventDefault();

            // активизирует переход на страницу
            const pathname = event.target.pathname;
            this.go(pathname);
        });

        // активизирует переход на ту страницу, которая сейчас набрана в адресной строке
        this.go(window.location.pathname);
    }

    // метод, активизирующий переход на страницу "route"
    go(route) {
        // идем по массиву сохраненных путей
        this.routes.find(info => {

            // проверяем страницу на соответствие регулярному выражению
            if (!info.path.test(route)) {
                return false;
            }

            // меняем значение в адресной строке браузера
            if (window.location.pathname !== route) {
                window.history.pushState({}, '', route);
            }

            // вызываем метод destroy у текущего отображения страницы
            if (this.current) {
                this.current.destroy();
            }

            // вызываем метод create у страницы, соответствующей
            // текущему пути
            info.view.create();
            this.currentView = info.view;

            return true;
        });
    }
}