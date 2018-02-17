import * as React from 'react';
import List, { ListItem } from 'material-ui/List';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import { DateModes, DateTimeView } from './';
import { Dialog, DialogMessage } from '../stores';

const DialogMessage = (myName: string) => ({Login, Message, Time}: DialogMessage, index: number) => (
    <ListItem key={index}>
        [<DateTimeView Time={Time} Mode={DateModes.Time}/>]
        &nbsp;
        <span style={{color: '#000', fontWeight: (myName === Login ? 'bold' : 'normal')}}>
            &lt;{Login}&gt;
        </span>
        : {Message}
    </ListItem>
);

interface DialogMessagesListProps {
    dialogs: Dialog[];
    login: string;
    myName: string;
}

type DialogMessagesListPropsWithStyles = DialogMessagesListProps & WithStyles<'root'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {
        width: '400px',
        margin: 10,
        overflowY: 'auto',
        overflowX: 'hidden',
        maxHeight: '245px'
    }
});

const DialogMessagesList = ({classes, dialogs, login, myName}: DialogMessagesListPropsWithStyles) => (
    <List className={'with-scrollbar ' + classes.root}>
        {
            (dialogs.find((dialog) => dialog.Login === login) as Dialog)
                .Items.map(DialogMessage(myName))}
    </List>
);

export default withStyles(styles)<DialogMessagesListProps>(DialogMessagesList);
