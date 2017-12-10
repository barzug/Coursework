import HttpSend from '../modules/http';

class BackendService {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
    }

    forumCreate(slug, title, user, vote_type, delete_message, description) {
        return HttpSend(`${this.baseUrl}/api/forum/create`, 'POST', {slug, title, user, vote_type, delete_message, description});
    }

    threadCreate(forum_slug, slug, title, user, description) {
        return HttpSend(`${this.baseUrl}/api/forum/${forum_slug}/create`, 'POST', {slug, title, user, description});
    }

    getForums(nickname) {
        return HttpSend(`${this.baseUrl}/api/user/${nickname}/forums`, 'GET', {});
    }

    forumDetails(slug) {
        return HttpSend(`${this.baseUrl}/api/forum/${slug}/details`, 'GET', {});
    }

    threadDetails(slug) {
        return HttpSend(`${this.baseUrl}/api/thread/${slug}/details`, 'GET', {});
    }

    getThreads(slug) {
        return HttpSend(`${this.baseUrl}/api/forum/${slug}/threads`, 'GET', {});
    }

    signup(email, login, password) {
        return HttpSend(`${this.baseUrl}/signup`, 'POST', { email, login, password });
    }

    login(login, password) {
        return HttpSend(`${this.baseUrl}/signin`, 'POST', { login, password });
    }

    logout() {
        return HttpSend(`${this.baseUrl}/signout`, 'DELETE', {});
    }
}

export default BackendService;