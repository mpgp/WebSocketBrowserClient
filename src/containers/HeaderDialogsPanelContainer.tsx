import * as React from 'react';
import { observer } from 'mobx-react';

import { DialogsStore } from '../stores';
import { HeaderDialogsPanel } from '../components';

@observer
class HeaderDialogsPanelContainer extends React.Component<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HeaderDialogsPanel dialogsCount={DialogsStore.dialogs.length} title={DialogsStore.title} />
        );
    }
}

export default HeaderDialogsPanelContainer;
