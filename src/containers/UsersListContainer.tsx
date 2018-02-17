import * as React from 'react';
import { observer } from 'mobx-react';

import { UsersList } from '../components';
import { DialogsStore, DialogsStoreMode, ServerRoomUsersStore } from '../stores';

@observer
class UsersListContainer extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(login: string) {
        DialogsStore.setIsOpen(true);
        DialogsStore.setPickedLogin(login);
        DialogsStore.setMode(DialogsStoreMode.DIALOG_MESSAGES_LIST);
    }

    render() {
        return (
            <UsersList
                users={ServerRoomUsersStore.users}
                handleClick={this.handleClick}
            />
        );
    }
}

export default UsersListContainer;
