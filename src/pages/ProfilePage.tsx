import * as React from 'react';
import { NavLink } from 'react-router-dom';

import { AppStore } from '../stores';

class ProfilePage extends React.PureComponent<{}, {}> {
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
