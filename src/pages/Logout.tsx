import * as React from 'react';
import { Redirect } from 'react-router-dom';
import { REQUEST_STATUS } from '../common/enums';
import { RequestStatus } from '../common/interfaces';

class Logout extends React.Component<{}, RequestStatus> {
    constructor(props: {}) {
        super(props);
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    componentDidMount() {
        // TODO: send request
        localStorage.removeItem('auth');
        console.warn('send DELETE to /api/account');
        this.setState({status: REQUEST_STATUS.SUCCESS});
        setTimeout(window.location.reload(), 500);
    }

    render() {
        return this.state.status === REQUEST_STATUS.SUCCESS ? <Redirect to="/"/> : <div>...</div>;
    }
}

export default Logout;
