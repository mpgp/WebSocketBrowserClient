import * as React from 'react';

import { CONTROLLERS, FetchApi } from '../common/FetchApi';
import { REQUEST_STATUS } from '../common/enums';
import AuthForm, { AuthData } from '../components/AuthForm';
import { RequestError, RequestStatus } from '../common/interfaces';

class Auth extends React.Component<{}, RequestStatus> {
    constructor() {
        super();
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    authorize = ({Login, Password}: AuthData) => {
        FetchApi.post(CONTROLLERS.account, { Login, Password })
            .then((response) => {
                if (response && response.authToken) {
                    localStorage.setItem('auth', JSON.stringify({token: response.authToken, Login}));
                    this.setState({status: REQUEST_STATUS.SUCCESS});
                    return;
                }

                this.setState({
                    errors: response.errors,
                    status: REQUEST_STATUS.ERROR
                });
            });
    }

    componentWillMount() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');

        if (!auth || !auth.token) {
            this.setState({status: REQUEST_STATUS.ERROR});
            return;
        }

        FetchApi.patch(CONTROLLERS.account, { Token: auth.token })
            .then(({status}) => {
                this.setState({status: status ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR});
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
                body = (
                    <div>
                        <h1>Sign In</h1>
                        {this.state.errors
                            .map((error: RequestError) => <p key={error.code}>{error.message}</p>)}
                        <AuthForm onSubmit={this.authorize} />
                        <p>
                            <a href='/signup'>Sign Up</a>
                        </p>
                        <p>
                            <a href='/forgot'>Forgot Password?</a>
                        </p>
                    </div>
                );
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
