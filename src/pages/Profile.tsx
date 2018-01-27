import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Profile = () => (
    <div className="Profile">
        <p>Hello, {(JSON.parse(localStorage.getItem('auth') || '{}') || {login: ''}).login}!</p>
        <NavLink to="/">Go back</NavLink>
    </div>
);

export default Profile;
