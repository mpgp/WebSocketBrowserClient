import * as React from 'react';
import { observer } from 'mobx-react';

import { DialogsStore } from '../stores';
import { HeaderDialogsPanel } from '../components';

@observer
class HeaderDialogsPanelContainer extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {};
        this.changeStatus = this.changeStatus.bind(this);
    }

    changeStatus(isOpen: boolean) {
        DialogsStore.setIsOpen(isOpen);
    }

    render() {
        return (
            <HeaderDialogsPanel
                changeStatus={this.changeStatus}
                dialogsCount={DialogsStore.dialogs.length}
                isOpen={DialogsStore.isOpen}
                mode={DialogsStore.mode}
                title={DialogsStore.title}
            />
        );
    }
}

export default HeaderDialogsPanelContainer;
