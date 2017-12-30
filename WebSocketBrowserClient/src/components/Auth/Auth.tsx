import * as React from 'react';
import * as PropTypes from 'prop-types';

import AuthForm from './AuthForm';

interface AuthState {
    authorized: boolean;
    chatMessages: string[];
    message: string;
    ws: WebSocket;
}

class Auth extends React.Component<{}, AuthState>
{
    static childContextTypes = {
        chatMessages: PropTypes.arrayOf(PropTypes.string),
        message: PropTypes.string,
        ws: PropTypes.object.isRequired
    };

    // private readonly WS_PATH = 'ws://localhost:8181/consoleappsample';
    private readonly WS_PATH = 'ws://echo.websocket.org';

    constructor() {
        super();
        this.state = {
            authorized: false,
            chatMessages: [],
            message: '',
            ws: null
        };
    }

    getChildContext() {
        return {
            message: this.state.message,
            chatMessages: this.state.chatMessages,
            ws: this.state.ws
        };
    }

    componentWillMount() {
        this.connectToServer();
    }

    componentWillUnmount() {
        this.state.ws.close();
    }

    connectToServer() {
        const wsImpl = window.WebSocket || window.MozWebSocket;
        const ws = new wsImpl(this.WS_PATH);
        this.setState({ ws });

        ws.onclose = this.OnClose;
        ws.onmessage = this.OnMessage;
        ws.onopen = this.OnOpen;
    }

    OnClose = (event: Event) => {
        this.setState({ authorized: false });
        this.connectToServer();
        console.warn('OnClose:::', event);
    }

    OnMessage = ({ data }: any) => {
        console.warn('OnMessage:::', event);
        this.setState((prevState: AuthState) => {
            return {chatMessages: [...prevState.chatMessages, data]};
        });
    }

    OnOpen = (event: Event) => {
        console.warn('OnOpen:::', event);
    }

    onSubmitForm = (userName: string) => {
        this.state.ws.send(userName);
        this.setState({ authorized: true });
    }

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
