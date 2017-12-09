import HttpSend from '../modules/http';

class BackendService {
    constructor() {
        this.baseUrl = 'http://localhost:3001';
    }

    forumCreate(slug, title, user, vote_type, delete_message, description) {
        return HttpSend(`${this.baseUrl}/api/forum/create`, 'POST', {slug, title, user, vote_type, delete_message, description});
    }

    getForums(nickname) {
        return HttpSend(`${this.baseUrl}/api/user/${nickname}/forums`, 'GET', {});
    }

    forumDetails(slug) {
        return HttpSend(`${this.baseUrl}/api/forum/${slug}/details`, 'GET', {});
    }

    status() {
        return HttpSend(`${this.baseUrl}/status`, 'GET', {});
    }

    signup(email, login, password) {
        return HttpSend(`${this.baseUrl}/signup`, 'POST', { email, login, password });
    }

    login(login, password) {
        return HttpSend(`${this.baseUrl}/signin`, 'POST', { login, password });
    }

    getData() {
        return HttpSend(`${this.baseUrl}/currentUser`, 'GET', {})
            .then(userdata => {
                return userdata;
            });
    }

    logout() {
        return HttpSend(`${this.baseUrl}/signout`, 'DELETE', {});
    }
}

export default BackendService;