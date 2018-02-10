import * as React from 'react';
import IconButton from 'material-ui/IconButton';
import MailIcon from 'material-ui-icons/Mail';
import Badge from 'material-ui/Badge';

interface HeaderMessagesPanelProps {
    unreadDialogs: number;
}

const HeaderMessagesPanel = (props: HeaderMessagesPanelProps) => (
    <IconButton title="Private messages">
        <Badge badgeContent={props.unreadDialogs} color="secondary">
            <MailIcon />
        </Badge>
    </IconButton>
);

export default HeaderMessagesPanel;
