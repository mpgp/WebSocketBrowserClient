import * as React from 'react';
import { Redirect } from 'react-router-dom';

import { AppStore } from '../stores';
import { REQUEST_STATUS } from '../common/enums';
import { AccountService } from '../services';
import { RequestStatus } from '../common/interfaces';
import { SignUpForm, SignUpData } from '../components/forms';

class SignUp extends React.PureComponent<{}, RequestStatus> {
    private errorMessages = {'1000': 'Login already exists'};

    constructor(props: {}) {
        super(props);
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };

        this.signUp = this.signUp.bind(this);
    }

    async signUp(signUpData: SignUpData) {
        const response = await AccountService.register(signUpData);
        if (!response || response.errors) {
            const errors = response.errors ? response.errors : [];
            this.setState({
                errors: errors.map((errorCode) => this.errorMessages[errorCode]),
                status: REQUEST_STATUS.ERROR
            });
            return;
        }

        const jsonRegisterData = {token: response.data.token, login: signUpData.Login};
        AppStore.setUserInfo(jsonRegisterData);
        this.setState({status: REQUEST_STATUS.SUCCESS});
    }

    componentDidMount() {
        if (AppStore.userInfo.token) {
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
