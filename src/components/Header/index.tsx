import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
    <div className="menu">
        <ul>
            <li>
                <NavLink to="/" exact={true}>Index</NavLink>
            </li>
            <li>
                <NavLink to="/logout" exact={true}>Logout</NavLink>
            </li>
        </ul>
    </div>
);

export { Header };
