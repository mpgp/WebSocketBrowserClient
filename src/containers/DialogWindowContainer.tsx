import * as React from 'react';
import { observer } from 'mobx-react';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';

import { AppStore, Dialog, DialogsStore } from '../stores';
import { DialogMessagesList, DialogsList } from '../components';

enum Layout {
    DIALOG_MESSAGES_LIST,
    DIALOGS_LIST
}

interface DialogWindowContainerState {
    layout: Layout;
}

@observer
class DialogWindowContainer extends React.Component<{}, DialogWindowContainerState> {
    private pickedDialog: Dialog;

    constructor(props: {}) {
        super(props);
        this.state = { layout: Layout.DIALOGS_LIST };
        this.onPickDialog = this.onPickDialog.bind(this);
        this.onBack = this.onBack.bind(this);
    }

    onBack() {
        DialogsStore.resetTitle();
        this.setState({ layout: Layout.DIALOGS_LIST });
    }

    onPickDialog(Login: string) {
        const dialogTitle = (
            <span onClick={this.onBack} title="Go back" style={{cursor: 'pointer'}}>
                <KeyboardArrowLeft key={0} />
                <span key={Login} style={{top: '-5px', position: 'relative'}}>{Login}</span>
                &nbsp;
                <img src="https://image.flaticon.com/icons/svg/25/25231.svg" width="40" height="40" key={'_' + Login} />
            </span>
        );
        DialogsStore.setTitle(dialogTitle);
        this.pickedDialog = DialogsStore.dialogs.find((dialog: Dialog) => dialog.Login === Login) as Dialog;
        this.setState({ layout: Layout.DIALOG_MESSAGES_LIST });
    }

    render() {
        return this.state.layout === Layout.DIALOGS_LIST
            ? <DialogsList dialogs={DialogsStore.dialogs} onPickDialog={this.onPickDialog} />
            : <DialogMessagesList dialog={this.pickedDialog} myName={AppStore.userInfo.login}/>;
    }
}

export default DialogWindowContainer;
