import { observable } from 'mobx';

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
    @observable dialogs: Dialog[] = dialogsList;
    @observable title = 'Dialog list';
}

export default new DialogsStore();
