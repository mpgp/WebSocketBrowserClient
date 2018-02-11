import * as React from 'react';

import { Dialog } from '../stores';

interface DialogItemProps extends Dialog {
    onPickDialog: (Login: string) => void;
}

class DialogItem extends React.PureComponent<DialogItemProps, {}> {
    constructor(props: DialogItemProps) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.onPickDialog(this.props.Login);
    }

    render() {
        return (
            <div onClick={this.handleClick}>
                <h2>{this.props.Login}</h2>
                <p>{this.props.Items[this.props.Items.length - 1].Message}</p>
            </div>
        );
    }
}

interface DialogsListProps {
    dialogs: Dialog[];
    onPickDialog: (Login: string) => void;
}

const DialogsList = ({dialogs, onPickDialog}: DialogsListProps) => (
    <div className="DialogsListContainer">
        {
            dialogs.map((dialog: Dialog) => (
                <DialogItem Login={dialog.Login} Items={dialog.Items} onPickDialog={onPickDialog} key={dialog.Login} />
            ))
        }
    </div>
);

export default DialogsList;
