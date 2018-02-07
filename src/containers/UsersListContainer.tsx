import * as React from 'react';
import { observer } from 'mobx-react';

import UsersList from '../components/UsersList';
import ServerRoomUsersStore from '../stores/ServerRoomUsersStore';

@observer
class UsersListContainer extends React.Component<{}, {}> {
    render() {
        return (
            <UsersList users={ServerRoomUsersStore.users} />
        );
    }
}

export default UsersListContainer;
