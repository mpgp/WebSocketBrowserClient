import * as React from 'react';
import * as PropTypes from 'prop-types';

import AuthForm from './AuthForm';

export interface WebSocketMessage {
    type: string;
    payload?: any;
}

interface AuthState {
    authorized: boolean;
    userName: string;
    webSocketMessages: WebSocketMessage[];
    ws: WebSocket;
}

class Auth extends React.Component<{}, AuthState> {
    static childContextTypes = {
        userName: PropTypes.string.isRequired,
        webSocketMessages: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            payload: PropTypes.object
        })),
        ws: PropTypes.object.isRequired
    };

    // private readonly WS_PATH = 'ws://localhost:8181/consoleappsample';
    private readonly WS_PATH = 'ws://echo.websocket.org';

    constructor() {
        super();
        this.state = {
            authorized: false,
            userName: '',
            webSocketMessages: [],
            ws: null
        };
    }

    getChildContext() {
        return {
            userName: this.state.userName,
            webSocketMessages: this.state.webSocketMessages,
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
        console.warn('OnMessage:::', data);
        this.setState((prevState: AuthState) => {
            return {webSocketMessages: [...prevState.webSocketMessages, JSON.parse(data)]};
        });
    }

    OnOpen = (event: Event) => {
        console.warn('OnOpen:::', event);
    }

    onSubmitForm = (userName: string) => {
        const data = {
            type: 'AUTH',
            payload: {
                Time: '16:42',
                UserName: userName
            }
        };
        this.setState({
            authorized: true,
            userName
        });
        this.state.ws.send(JSON.stringify(data));
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
