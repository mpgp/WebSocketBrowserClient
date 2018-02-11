import * as React from 'react';
import { action, observable } from 'mobx';

export interface DialogMessage {
    Login: string;
    Message: string;
    Time: number;
}

export interface Dialog {
    Login: string;
    Items: DialogMessage[];
}

const dialogsList: Dialog[] = [{
    Login: 'user2018',
    Items: [
        { Login: 'user2018', Message: 'Hello', Time: 1897414 },
        { Login: 'admin2018', Message: 'Welcome to our chat!', Time: 1897424 },
    ]
}, {
    Login: 'Scorpio92',
    Items: [
        { Login: 'Scorpio92', Message: 'RSA + AES ?', Time: 277435 },
        { Login: 'admin2018', Message: 'HTTPS + WSS !', Time: 277469 },
    ]
}];

class DialogsStore {
    private static readonly defaultTitle = <span>Dialog list</span>;

    @observable dialogs: Dialog[] = dialogsList;
    @observable title = DialogsStore.defaultTitle;

    @action setTitle(title: JSX.Element) {
        this.title = title;
    }

    resetTitle() {
        this.setTitle(DialogsStore.defaultTitle);
    }
}

export default new DialogsStore();
