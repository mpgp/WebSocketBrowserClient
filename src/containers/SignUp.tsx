import * as React from 'react';
import { Redirect } from 'react-router-dom';

import FetchApi from '../common/FetchApi';
import { REQUEST_STATUS } from '../common/enums';
import AuthForm, { AuthData } from '../components/Auth/AuthForm';
import { RequestError, RequestStatus } from '../common/interfaces';

class SignUp extends React.Component<{}, RequestStatus> {
    constructor() {
        super();
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    signUp = ({Login, Password}: AuthData) => {
        FetchApi.put('account', { Login, Password })
            .then((response) => {
                console.warn(response);
                if (response && response.authToken) {
                    localStorage.setItem('auth', JSON.stringify({token: response.authToken}));
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

        if (auth && auth.token) {
            this.setState({status: REQUEST_STATUS.SUCCESS});
        }
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = <Redirect to='/'/>;
                break;
            }

            default: {
                body = (
                    <div>
                        {this.state.errors
                            .map((error: RequestError) => <p key={error.code}>{error.message}</p>)}
                        <AuthForm onSubmit={this.signUp} />
                        <p>
                            <a href='/'>Sign In</a>
                        </p>
                    </div>
                );
                break;
            }
        }

        return (
            <div className='SignUp'>
                <h1>Sign Up</h1>
                {body}
            </div>
        );
    }
}

export default SignUp;
