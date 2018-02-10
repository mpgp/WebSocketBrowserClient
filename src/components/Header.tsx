import * as React from 'react';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'material-ui-icons/Home';
import MailIcon from 'material-ui-icons/Mail';
import IconButton from 'material-ui/IconButton';

import HeaderUserPanel from './HeaderUserPanel';
import HeaderTitleContainer from '../containers/HeaderTitleContainer';

class Header extends React.PureComponent<{}, {}> {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/" exact={true}>
                        <IconButton className="menuButton" color="secondary" aria-label="Menu" title="Home">
                            <HomeIcon />
                        </IconButton>
                    </NavLink>
                    <HeaderTitleContainer />
                    <div>
                        <IconButton title="Private messages">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <HeaderUserPanel />
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
