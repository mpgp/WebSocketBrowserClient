import * as React from 'react';

import { REQUEST_STATUS } from '../common/enums';
import { AccountService } from '../services/http';
import { RequestStatus } from '../common/interfaces';
import AuthForm, { AuthData } from '../components/forms/AuthForm';

class Auth extends React.PureComponent<{}, RequestStatus> {
    private errorMessages = {'1001': 'Incorrect Login or Password'};

    constructor(props: {}) {
        super(props);
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };
        this.authorize = this.authorize.bind(this);
    }

    async authorize(authData: AuthData) {
        const response = await AccountService.auth(authData);

        if (!response || response.errors) {
            const errors = response.errors ? response.errors : [];
            this.setState({
                errors: errors.map((errorCode) => this.errorMessages[errorCode]),
                status: REQUEST_STATUS.ERROR
            });
            return;
        }

        const jsonAuthData = JSON.stringify({token: response.data.token, login: authData.Login});
        localStorage.setItem('auth', jsonAuthData);
        this.setState({status: REQUEST_STATUS.SUCCESS});
    }

    async componentDidMount() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');

        if (!auth || !auth.token) {
            this.setState({status: REQUEST_STATUS.ERROR});
            return;
        }

        const status = await AccountService.checkToken(auth.token);
        this.setState({
            status: status ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR
        });
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = this.props.children;
                break;
            }

            case REQUEST_STATUS.ERROR: {
                body = <AuthForm onSubmit={this.authorize} errors={this.state.errors || []}/>;
                break;
            }

            default: {
                body = 'spinner ...';
                break;
            }
        }

        return (
            <div className="Auth" style={{ height: '100%' }}>
                {body}
            </div>
        );
    }
}

export default Auth;
