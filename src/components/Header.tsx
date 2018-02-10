import * as React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'material-ui-icons/Home';
import IconButton from 'material-ui/IconButton';

import { HeaderUserPanel } from './';
import { HeaderTitleContainer, HeaderMessagesPanelContainer } from '../containers';

const Header = () => (
    <AppBar position="static">
        <Toolbar>
            <NavLink to="/" exact={true}>
                <IconButton className="menuButton" color="secondary" aria-label="Menu" title="Home">
                    <HomeIcon />
                </IconButton>
            </NavLink>
            <HeaderTitleContainer />
            <div>
                <HeaderMessagesPanelContainer />
                <HeaderUserPanel />
            </div>
        </Toolbar>
    </AppBar>
);

export default Header;
