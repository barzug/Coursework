import HttpSend from '../modules/http';

class UserService {
    constructor() {
        this.baseUrl = `${window.location.protocol}//${window.location.host}`;
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

export default UserService;