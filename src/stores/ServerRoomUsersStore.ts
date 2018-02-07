import { computed, observable } from 'mobx';

import WebSocketService from '../services/WebSocketService';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { AuthMessage, UserConnectionMessage } from '../common/interfaces/WebSocketPayloads/Server';

class ServerRoomUsersStore {
    @observable private _users: string[] = [];

    @computed get users() {
        return this._users.sort();
    }

    constructor() {
        WebSocketService.subscribe(
            WebSocketPayloadTypes.AuthMessage,
            (message: AuthMessage) => { this._users = [...message.UsersList]; });

        WebSocketService.subscribe(
            WebSocketPayloadTypes.UserConnectionMessage,
            (message: UserConnectionMessage) => {
                if (message.Status === 'CONNECT') {
                    this._users = [...this._users, message.Login];
                } else {
                    var oldUserIndex = this._users.findIndex((user) => user === message.Login);
                    if (oldUserIndex !== -1) {
                        this._users.splice(oldUserIndex, 1);
                        this._users = [...this._users];
                    }
                }
            }
        );
    }
}

export default new ServerRoomUsersStore();
