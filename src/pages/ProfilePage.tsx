import * as React from 'react';
import { observer } from 'mobx-react';
import { NavLink } from 'react-router-dom';

import { AppStore } from '../stores';

@observer
class ProfilePage extends React.Component<{}, {}> {
    componentDidMount() {
        AppStore.setTitle('Your profile');
    }

    render() {
        return (
            <div className="ProfilePage">
                <p>Hello, {AppStore.userInfo.login}!</p>
                <NavLink to="/">Go back</NavLink>
            </div>
        );
    }
}

export default ProfilePage;
