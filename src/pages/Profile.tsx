import * as React from 'react';
import { NavLink } from 'react-router-dom';

import AppStore from '../stores/AppStore';

class Profile extends React.PureComponent<{}, {}> {
    componentDidMount() {
        AppStore.setTitle('Your profile');
    }

    render() {
        return (
            <div className="Profile">
                <p>Hello, {AppStore.userInfo.login}!</p>
                <NavLink to="/">Go back</NavLink>
            </div>
        );
    }
}

export default Profile;
