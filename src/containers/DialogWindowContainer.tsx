import * as React from 'react';
import { observer } from 'mobx-react';

import { WebSocketService } from '../services';
import { AppStore, DialogsStore, DialogsStoreMode } from '../stores';
import { AddMessageForm, DialogMessagesList, DialogsList } from '../components';
import { DialogMessage as ClientDialogMessage } from '../common/interfaces/WebSocketPayloads/Client';

interface DialogWindowContainerProps {
    mode: DialogsStoreMode;
    pickedLogin?: string;
}

@observer
class DialogWindowContainer extends React.Component<DialogWindowContainerProps, {}> {
    constructor(props: DialogWindowContainerProps) {
        super(props);
        this.onPickDialog = this.onPickDialog.bind(this);
        this.onSendMessage = this.onSendMessage.bind(this);
    }

    componentWillMount() {
        DialogsStore.setMode(this.props.mode);
        if (this.props.pickedLogin) {
            DialogsStore.setPickedLogin(this.props.pickedLogin);
        }
    }

    onSendMessage(message: string) {
        WebSocketService.send(new ClientDialogMessage(message, DialogsStore.pickedLogin));
    }

    onPickDialog(Login: string) {
        DialogsStore.setMode(DialogsStoreMode.DIALOG_MESSAGES_LIST);
        DialogsStore.setPickedLogin(Login);
    }

    render() {
        return DialogsStore.mode === DialogsStoreMode.DIALOGS_LIST
            ? <DialogsList dialogs={DialogsStore.dialogs} onPickDialog={this.onPickDialog} />
            : (
                <React.Fragment>
                    <DialogMessagesList
                        dialogs={DialogsStore.dialogs}
                        login={DialogsStore.pickedLogin}
                        myName={AppStore.userInfo.login}
                    />
                    <AddMessageForm onSubmit={this.onSendMessage} />
                </React.Fragment>
            );
    }
}

export default DialogWindowContainer;
