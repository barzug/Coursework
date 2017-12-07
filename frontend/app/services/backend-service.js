import HttpSend from '../modules/http';

class BackendService {
    constructor() {
        this.baseUrl = 'https://jees-quoridor-backend.herokuapp.com';
        window.localStorage['backendUrl'] = this.baseUrl;
        // this.baseUrl = `${window.location.protocol}//${window.location.host}`;
    }

    forumCreate(slug, title, user) {
        return HttpSend(`${this.baseUrl}/api/forum/create`, 'POST', {slug, title, user});
    }

    forumDetails(slug) {
        return HttpSend(`${this.baseUrl}api/forum/${slug}/details`, 'GET', {});
    }

    status() {
        return HttpSend(`${this.baseUrl}/status`, 'GET', {});
    }
}

export default BackendService;