import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { AppStore } from '../stores';
import { REQUEST_STATUS } from '../common/enums';
import { RequestStatus } from '../common/interfaces';

class Logout extends React.PureComponent<{}, RequestStatus> {
    constructor(props: {}) {
        super(props);
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    componentDidMount() {
        // TODO: send request
        AppStore.removeUserInfo();
        console.warn('send DELETE to /api/token');
        this.setState({status: REQUEST_STATUS.SUCCESS});
        setTimeout(() => window.location.reload(), 500);
    }

    render() {
        return this.state.status === REQUEST_STATUS.SUCCESS ? <Redirect to="/"/> : <div>...</div>;
    }
}

export default Logout;
