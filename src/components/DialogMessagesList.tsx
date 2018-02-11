import * as React from 'react';

import { Dialog, DialogMessage } from '../stores';

const DialogMessage = ({Login, Message, Time}: DialogMessage, index: number) => (
    <div key={index}>
        {Message}
    </div>
);

interface DialogMessagesListProps {
    dialog: Dialog;
    toggle: () => void;
}

const DialogMessagesList = ({dialog, toggle}: DialogMessagesListProps) => (
    <div className="DialogsListContainer" onClick={toggle}>
        <h2>{dialog.Login}</h2>
        {dialog.Items.map(DialogMessage)}
    </div>
);

export default DialogMessagesList;
