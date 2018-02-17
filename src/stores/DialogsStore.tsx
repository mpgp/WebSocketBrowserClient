import * as React from 'react';
import { action, observable } from 'mobx';

import { AppStore } from './';
import { WebSocketService } from '../services';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { DialogMessage as ServerDialogMessage } from '../common/interfaces/WebSocketPayloads/Server';
import DialogTitle from '../components/DialogTitle';

export enum DialogsStoreMode {
    DIALOG_MESSAGES_LIST,
    DIALOGS_LIST
}

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
    Login: 'test',
    Items: [
        { Login: 'test', Message: 'Hello', Time: 1897414 },
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
    @observable mode = DialogsStoreMode.DIALOGS_LIST;
    @observable isOpen = false;
    @observable pickedLogin = '';

    constructor() {
        this.onTitleClick = this.onTitleClick.bind(this);
        WebSocketService.subscribe(
            WebSocketPayloadTypes.DialogMessage,
            (serverDialogMessage: ServerDialogMessage) => {
                const dialogIndex = this.findDialogIndex(serverDialogMessage);

                const newDialogMessage = {
                    Login: serverDialogMessage.Login,
                    Message: serverDialogMessage.Message,
                    Time: serverDialogMessage.Time
                };

                if (dialogIndex === -1) {
                    const newDialog = {
                        Login: serverDialogMessage.Login,
                        Items: [newDialogMessage]
                    };
                    this.dialogs = [...this.dialogs, newDialog];
                } else {
                    this.dialogs[dialogIndex].Items = [...this.dialogs[dialogIndex].Items, newDialogMessage];
                    this.dialogs = [...this.dialogs];
                }
            });
    }

    @action setTitle(title: JSX.Element) {
        this.title = title;
    }

    resetTitle() {
        this.setTitle(DialogsStore.defaultTitle);
    }

    @action setIsOpen(isOpen: boolean) {
        this.isOpen = isOpen;
    }

    @action setMode(mode: DialogsStoreMode) {
        this.mode = mode;
    }

    @action setPickedLogin(login: string) {
        if (!this.dialogs.some((dialog) => dialog.Login === login)) {
            this.dialogs = [...this.dialogs, {
                Login: login,
                Items: []
            }];
        }
        this.pickedLogin = login;
        const dialogTitle = <DialogTitle login={login} onTitleClick={this.onTitleClick} />;
        this.setTitle(dialogTitle);
    }

    private findDialogIndex(serverDialogMessage: ServerDialogMessage) {
        if (serverDialogMessage.Login === AppStore.userInfo.login) {
            return this.dialogs
                .findIndex((dialog) => dialog.Login === serverDialogMessage.Receiver);
        }

        return this.dialogs
            .findIndex((dialog) => dialog.Login === serverDialogMessage.Login);
    }

    private onTitleClick() {
        this.resetTitle();
        this.setMode(DialogsStoreMode.DIALOGS_LIST);
    }
}

export default new DialogsStore();
