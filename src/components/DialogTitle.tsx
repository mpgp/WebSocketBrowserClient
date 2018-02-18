import * as React from 'react';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';

interface DialogTitleProps {
    login: string;
    onTitleClick: () => void;
}

const DialogTitle = ({login, onTitleClick}: DialogTitleProps) => (
    <div key={login}>
        <span onClick={onTitleClick} title="Go back" style={{cursor: 'pointer'}}>
            <KeyboardArrowLeft />
            <span style={{top: '-5px', position: 'relative'}}>{login}</span>
        </span>
        &nbsp;
        <NavLink to={`/user/${login}`} title="Show profile">
            <span style={{display: 'inline-block'}}>
                <Avatar src={`${process.env.REACT_APP_API_PATH}user/${login}/avatar.jpg`} />
            </span>
        </NavLink>
    </div>
);

export default DialogTitle;
