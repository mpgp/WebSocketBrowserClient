import * as React from 'react';
import HeaderMessagesPanel from '../components/HeaderMessagesPanel';

class HeaderMessagesPanelContainer extends React.PureComponent<{}, {}> {
    constructor(props: {}) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <HeaderMessagesPanel unreadDialogs={9} />
        );
    }
}

export default HeaderMessagesPanelContainer;
