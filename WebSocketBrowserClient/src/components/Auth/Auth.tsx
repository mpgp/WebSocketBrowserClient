import * as React from 'react';
import { observer } from 'mobx-react';

import AuthForm from './AuthForm';
import WebSocketStore from '../../stores/WebSocketStore';

@observer
class Auth extends React.Component<{}, {}> {
    componentWillMount() {
        WebSocketStore.connectToServer();
    }

    componentWillUnmount() {
        WebSocketStore.close();
    }

    onSubmitForm = (userName: string) => {
        WebSocketStore.setUserName(userName);
        WebSocketStore.setConnectionStatus(true);
        WebSocketStore.send({
            type: 'AUTH',
            payload: {
                Time: '16:42',
                UserName: userName
            }
        });
    }

    render() {
        return (
            <div className='auth'>
                {
                    WebSocketStore.connectionStatus
                    ? this.props.children
                    : <AuthForm onSubmit={this.onSubmitForm} />
                }
            </div>
        );
    }
}

export default Auth;
