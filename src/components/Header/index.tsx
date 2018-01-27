import * as React from 'react';
import Badge from 'material-ui/Badge';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import { NavLink } from 'react-router-dom';
import HomeIcon from 'material-ui-icons/Home';
import MailIcon from 'material-ui-icons/Mail';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import AccountCircle from 'material-ui-icons/AccountCircle';

class Header extends React.Component<{}, {}> {
    render() {
        return (
            <AppBar position="static">
                <Toolbar>
                    <NavLink to="/" exact={true}>
                        <IconButton className="menuButton" color="secondary" aria-label="Menu" title="Home">
                            <HomeIcon />
                        </IconButton>
                    </NavLink>
                    <Typography type="title" color="inherit" style={{flex: 1}}>
                        Multiplayer Game Platform
                    </Typography>
                    <div>
                        <NavLink to="/logout" exact={true}>Logout</NavLink>
                        <IconButton title="Not implemented yet...">
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
