import * as React from 'react';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'material-ui-icons/Home';
import MailIcon from 'material-ui-icons/Mail';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';

import HeaderTitle from '../containers/HeaderTitle';

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
                    <HeaderTitle />
                    <div>
                        <NavLink to="/logout" exact={true}>Logout</NavLink>
                        <IconButton title="Private messages">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <NavLink to="/profile" exact={true}>
                            <IconButton
                                aria-owns={open ? 'menu-appbar' : undefined}
                                aria-haspopup="true"
                                color="secondary"
                            >
                                <AccountCircle />
                            </IconButton>
                        </NavLink>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Header;
