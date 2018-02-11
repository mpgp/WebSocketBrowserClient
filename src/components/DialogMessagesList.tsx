import * as React from 'react';
import List, { ListItem } from 'material-ui/List';

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
    dialog: Dialog;
    myName: string;
}

const DialogMessagesList = ({dialog, myName}: DialogMessagesListProps) => (
    <List>
        {dialog.Items.map(DialogMessage(myName))}
    </List>
);

export default DialogMessagesList;
