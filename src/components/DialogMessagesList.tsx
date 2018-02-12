import * as React from 'react';
import List, { ListItem } from 'material-ui/List';

import { DateModes, DateTimeView } from './';
import { Dialog, DialogMessage } from '../stores';
import { StyleRulesCallback, WithStyles } from 'material-ui/styles/withStyles';
import withStyles from 'material-ui/styles/withStyles';

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
    dialog: Dialog;
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

const DialogMessagesList = ({classes, dialog, myName}: DialogMessagesListPropsWithStyles) => (
    <List className={'with-scrollbar ' + classes.root}>
        {dialog.Items.map(DialogMessage(myName))}
    </List>
);

export default withStyles(styles)<DialogMessagesListProps>(DialogMessagesList);
