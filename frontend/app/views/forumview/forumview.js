import BaseView from '../baseview';

export default class ForumView extends BaseView {
    constructor(parent) {
        super(parent);
    }

    create() {
        let forum_slug = window.location.href.split(`/`)[4]

        this.backendService.forumDetails(forum_slug)
            .then((data) => {
                this.element.innerHTML = this.render(data.slug, data.title, data.description, data.vote_type, data.delete_message);


                this.threadList = this.element.querySelector('.thread-list');

                this.backendService.getThreads(forum_slug)
                    .then((data) => {
                        data.forEach(element => {
                            this.threadList.insertAdjacentHTML(`beforeEnd`, this.renderThread(element.title, element.description, element.slug));
                        })
                    })
            })
            .catch((err) => {
                console.log(err)
            });
    }

    render(forum_slug, title, description, vote_type, delete_message) {
        return `
        <div class="row">        
        <div class="col-md-5">
        <form class="form">
        <h2 class="form-heading">Форум</h2>
        <input name="slug" class="form-control input-top" placeholder="Slug" required="" autofocus="" value="${forum_slug}">
        <input name="title" class="form-control input-base" placeholder="Title" required="" value="${title}">
        <textarea name="description" class="form-control input-bot" rows="3" placeholder="Описание">${description}</textarea>

        <select name="vote_type" class="form-control d-block my-3" required>
            <option value="1" ${vote_type === 1 ? "selected" : ""}>Лайки и дизлайки</option>
            <option value="2" ${vote_type === 2 ? "selected" : ""}>Оценки</option>
            <option value="3" ${vote_type === 3 ? "selected" : ""}>Только лайки</option>
        </select>
        <div class="checkbox">
            <label>
            <input type="checkbox" class="delete_message" ${delete_message ? "checked" : ""}> Можно удалять сообщения
            </label>
          </div>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Изменить</button>
        </form>
    </div>
       
    <div class="col-md-7">
    <h3 class="display-3">Ветки форума</h3>            
        <p>
            <a class="btn btn-lg btn-success" href="/forum/${forum_slug}/createthread" role="button">Создать новую!</a>
        </p>

    <div class="row marketing">
    <div class="col-lg-12 thread-list">
    </div>
    </div>
    </div>    
    </div>        
        `
    }

    renderThread(title, slug, description) {
        return `
    <div class="card mb-3">
    <div class="card-body">
        <h4 class="card-title">${title}</h4>
        <h6 class="card-subtitle mb-2 text-muted">${slug}</h6>
        <p class="card-text">${description}</p>
        <a href="/forum/${slug}">Подробнее</a>
    </div>
</div>`

    }
}

