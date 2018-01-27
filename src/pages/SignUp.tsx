import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { REQUEST_STATUS } from '../common/enums';
import { AccountService } from '../services/http';
import { RequestStatus } from '../common/interfaces';
import AuthForm, { AuthData } from '../components/forms/AuthForm';

class SignUp extends React.Component<{}, RequestStatus> {
    constructor(props: {}) {
        super(props);
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };

        this.signUp = this.signUp.bind(this);
    }

    async signUp(authData: AuthData) {
        const response = await AccountService.register(authData);
        if (!response || response.errors) {
            this.setState({
                errors: response && response.errors ? response.errors : [],
                status: REQUEST_STATUS.ERROR
            });
            return;
        }

        const jsonAuthData = JSON.stringify({token: response.data.token, login: authData.Login});
        localStorage.setItem('auth', jsonAuthData);
        this.setState({status: REQUEST_STATUS.SUCCESS});
    }

    componentDidMount() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');

        if (auth && auth.token) {
            this.setState({status: REQUEST_STATUS.SUCCESS});
        }
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = <Redirect to="/"/>;
                break;
            }

            default: {
                body = (
                    <div>
                        {this.state.errors && this.state.errors
                            .map((error: string) => <p key={error}>{error}</p>)}
                        <AuthForm onSubmit={this.signUp} />
                        <p>
                            <a href="/">Sign In</a>
                        </p>
                    </div>
                );
                break;
            }
        }

        return (
            <div className="SignUp">
                <h1>Sign Up</h1>
                {body}
            </div>
        );
    }
}

export default SignUp;
