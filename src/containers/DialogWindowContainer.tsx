import * as React from 'react';
import { observer } from 'mobx-react';
import Avatar from 'material-ui/Avatar';
import { NavLink } from 'react-router-dom';
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
        // TODO: move to new component!
        const dialogTitle = (
            <div key={Login}>
                <span onClick={this.onBack} title="Go back" style={{cursor: 'pointer'}} key={'back_' + Login} >
                    <KeyboardArrowLeft key={'left_' + Login} />
                    <span style={{top: '-5px', position: 'relative'}} key={'name_' + Login}>{Login}</span>
                </span>
                &nbsp;
                <NavLink to={`/user/${Login}`} key={'link_' + Login} title="Show profile">
                    <span style={{display: 'inline-block'}}>
                        <Avatar src={`${process.env.REACT_APP_API_PATH}user/${Login}/avatar.jpg`} />
                    </span>
                </NavLink>
            </div>
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
