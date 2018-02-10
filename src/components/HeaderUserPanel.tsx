import * as React from 'react';
import { NavLink } from 'react-router-dom';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import AccountCircle from 'material-ui-icons/AccountCircle';

interface HeaderUserPanelState {
    isOpen: boolean;
}

class HeaderUserPanel extends React.PureComponent<{}, HeaderUserPanelState> {
    private anchorEl: HTMLElement;

    constructor(props: {}) {
        super(props);
        this.state = {isOpen: false};
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
    }

    handleClick(event: React.MouseEvent<HTMLElement>) {
        this.anchorEl = event.currentTarget;
        this.setState({ isOpen: true });
    }

    handleClose() {
        this.setState({ isOpen: false });
    }

    render() {
        return (
            <span>
                <IconButton
                    aria-owns={this.state.isOpen ? 'menu-appbar' : undefined}
                    aria-haspopup="true"
                    color="secondary"
                    onClick={this.handleClick}
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={this.anchorEl}
                    open={this.state.isOpen}
                    onClose={this.handleClose}
                >
                    <NavLink to="/profile" exact={true}>
                        <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                    </NavLink>
                    <NavLink to="/logout" exact={true}>
                        <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                    </NavLink>
                </Menu>
            </span>
        );
    }
}

export default HeaderUserPanel;
