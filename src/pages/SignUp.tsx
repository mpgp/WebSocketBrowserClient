import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { REQUEST_STATUS } from '../common/enums';
import { AccountService } from '../services/http';
import { RequestStatus } from '../common/interfaces';
import SignUpForm, { RegisterData } from '../components/forms/SignUpForm';

class SignUp extends React.Component<{}, RequestStatus> {
    constructor(props: {}) {
        super(props);
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };

        this.signUp = this.signUp.bind(this);
    }

    async signUp(registerData: RegisterData) {
        const response = await AccountService.register(registerData);
        if (!response || response.errors) {
            this.setState({
                errors: response && response.errors ? response.errors : [],
                status: REQUEST_STATUS.ERROR
            });
            return;
        }

        const jsonRegisterData = JSON.stringify({token: response.data.token, login: registerData.Login});
        localStorage.setItem('auth', jsonRegisterData);
        this.setState({status: REQUEST_STATUS.SUCCESS});
    }

    componentDidMount() {
        const auth = JSON.parse(localStorage.getItem('auth') || '{}');

        if (auth && auth.token) {
            this.setState({status: REQUEST_STATUS.SUCCESS});
        }
    }

    render() {
        return (
            <div className="SignUp" style={{ height: '100%' }}>
                {this.state.status === REQUEST_STATUS.SUCCESS
                    ? <Redirect to="/"/>
                    : <SignUpForm onSubmit={this.signUp} errors={this.state.errors || []}/>
                }
            </div>
        );
    }
}

export default SignUp;
