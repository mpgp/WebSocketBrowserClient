import * as React from 'react';
import * as PropTypes from 'prop-types';
import AuthForm from './AuthForm';

interface AuthState {
    authorized: boolean;
    message: string;
    ws: WebSocket;
}

class Auth extends React.Component<{}, AuthState>
{
    // private readonly WS_PATH = 'ws://localhost:8181/consoleappsample';
    private readonly WS_PATH = 'ws://echo.websocket.org';

    static childContextTypes = {
        message: PropTypes.string,
        ws: PropTypes.object.isRequired
    };

    getChildContext() {
        return {
            message: this.state.message,
            ws: this.state.ws
        };
    }

    constructor(props: any) {
        super(props);
        this.state = {
            authorized: false,
            message: '',
            ws: null
        };
    }

    componentWillMount() {
        this.connectToServer();
    }

    componentWillUnmount() {
        this.state.ws.close();
        this.setState({ authorized: false });
    }

    connectToServer() {
        const wsImpl = window.WebSocket || window.MozWebSocket;
        const ws = new wsImpl(this.WS_PATH);
        this.setState({ ws });

        ws.onclose = this.OnClose;
        ws.onmessage = this.OnMessage;
        ws.onopen = this.OnOpen;
    }

    OnClose = (event: any) => {
        console.warn('OnClose:::', event);
    };

    OnMessage = (event: any) => {
        console.warn('OnMessage:::', event);
        this.setState({ message: event.data })
    };

    OnOpen = (event: any) => {
        console.warn('OnOpen:::', event);
    };

    onSubmitForm = (userName: string) => {
        this.state.ws.send(userName);
        this.setState({ authorized: true });
    };

    render() {
        console.warn(this.state.ws);
        return (
            <div className='auth'>
                {
                    this.state.authorized
                    ? this.props.children
                    : <AuthForm onSubmit={this.onSubmitForm} />
                }
            </div>
        );
    }
}

export default Auth;
