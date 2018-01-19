import * as React from 'react';
import { REQUEST_STATUS } from '../common/enums';
import { RequestStatus } from '../common/interfaces';

class Auth extends React.Component<{}, RequestStatus> {
    constructor() {
        super();
        this.state = {
            status: REQUEST_STATUS.PENDING
        };
    }

    componentWillMount() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');
        const status = auth && auth.token && auth.token === 'ok' ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR;
        setTimeout(() => this.setState({status}), 1000);
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = this.props.children;
                break;
            }

            case REQUEST_STATUS.ERROR: {
                body = 'error';
                break;
            }

            default: {
                body = 'spinner ...';
                break;
            }
        }

        return (
            <div className='Auth'>
                {body}
            </div>
        );
    }
}

export default Auth;
