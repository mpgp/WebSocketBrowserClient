import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStore } from '../stores';
import { AccountService } from '../services';
import { REQUEST_STATUS } from '../common/enums';
import { AuthForm, AuthData } from '../components';
import { RequestStatus } from '../common/interfaces';

@observer
class AuthPage extends React.Component<{}, RequestStatus> {
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

        const jsonAuthData = {token: response.data.token, login: authData.Login};
        AppStore.setUserInfo(jsonAuthData);
        this.setState({status: REQUEST_STATUS.SUCCESS});
    }

    async componentDidMount() {
        if (!AppStore.userInfo.token) {
            this.setState({status: REQUEST_STATUS.ERROR});
            return;
        }

        const status = await AccountService.checkToken(AppStore.userInfo.token);
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

export default AuthPage;
