import * as React from 'react';

import { Dialog, DialogMessage } from '../stores';

const DialogMessage = ({Login, Message, Time}: DialogMessage, index: number) => (
    <div key={index}>
        {Message}
    </div>
);

interface DialogMessagesListProps {
    dialog: Dialog;
}

const DialogMessagesList = ({dialog}: DialogMessagesListProps) => (
    <div className="DialogsListContainer">
        {dialog.Items.map(DialogMessage)}
    </div>
);

export default DialogMessagesList;
