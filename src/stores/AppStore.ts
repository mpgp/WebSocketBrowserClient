import { action, observable } from 'mobx';

interface UserInfo {
    token: string;
    login: string;
}

class AppStore {
    @observable title: string;
    @observable userInfo: UserInfo;

    constructor() {
        const info = JSON.parse(localStorage.getItem('auth') || '{}');
        this.userInfo = {
            token: info.token || '',
            login: info.login || '',
        };
    }

    @action removeUserInfo() {
        this.userInfo = {} as UserInfo;
        localStorage.removeItem('auth');
    }

    @action setTitle(title: string) {
        this.title = title;
    }

    @action setUserInfo(userInfo: UserInfo) {
        this.userInfo = userInfo;
        localStorage.setItem('auth', JSON.stringify(userInfo));
    }
}

export default new AppStore();
