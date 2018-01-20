import * as React from 'react';
import FetchApi from '../common/FetchApi';
import { REQUEST_STATUS } from '../common/enums';
import AuthForm, {AuthData} from '../components/Auth/AuthForm';
import {RequestError, RequestStatus} from '../common/interfaces';

class Auth extends React.Component<{}, RequestStatus> {
    constructor() {
        super();
        this.state = {
            errors: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    authorize = ({Login, Password}: AuthData) => {
        FetchApi.post('account', { Login, Password })
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

        if (!auth || !auth.token) {
            this.setState({status: REQUEST_STATUS.ERROR});
            return;
        }

        FetchApi.patch('account', { Token: auth.token })
            .then(({status}) => {
                this.setState({status: status ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR});
                console.warn(status);
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
                        {this.state.errors
                            .map((error: RequestError) => <p key={error.code}>{error.message}</p>)}
                        <AuthForm onSubmit={this.authorize} />
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
