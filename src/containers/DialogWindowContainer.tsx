import * as React from 'react';
import { observer } from 'mobx-react';

import { Dialog, DialogsStore } from '../stores';
import { DialogMessagesList, DialogsList } from '../components';

enum Layout {
    DIALOG_MESSAGES_LIST,
    DIALOGS_LIST
}

interface DialogWindowContainerState {
    layout: Layout;
    Login: string;
}

@observer
class DialogWindowContainer extends React.Component<{}, DialogWindowContainerState> {
    private pickedDialog: Dialog;

    constructor(props: {}) {
        super(props);
        this.state = { layout: Layout.DIALOGS_LIST, Login: '' };
        this.onPickDialog = this.onPickDialog.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onBack() {
        this.setState({ layout: Layout.DIALOGS_LIST });
    }

    onPickDialog(Login: string) {
        this.pickedDialog = DialogsStore.dialogs.find((dialog: Dialog) => dialog.Login === Login) as Dialog;
        this.setState({ layout: Layout.DIALOG_MESSAGES_LIST, Login });
    }

    render() {
        return this.state.layout === Layout.DIALOGS_LIST
            ? <DialogsList dialogs={DialogsStore.dialogs} onPickDialog={this.onPickDialog} />
            : <DialogMessagesList dialog={this.pickedDialog} toggle={this.onBack} />;
    }
}

export default DialogWindowContainer;
