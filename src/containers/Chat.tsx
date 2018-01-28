import * as React from 'react';

import AppStore from '../stores/AppStore';
import MessagesList from '../components/MessagesList';
import AddMessageForm from '../components/forms/AddMessageForm';
import WebSocketService, { Subscription } from '../services/WebSocketService';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { ChatMessage as ClientChatMessage } from '../common/interfaces/WebSocketPayloads/Client';
import { ChatMessage as ServerChatMessage } from '../common/interfaces/WebSocketPayloads/Server';
import Paper from 'material-ui/Paper';

interface ChatState {
    messages: ServerChatMessage[];
}

class Chat extends React.PureComponent<{}, ChatState> {
    private chatMessageSub: Subscription;
    private Login = AppStore.userInfo.login;

    constructor(props: {}) {
        super(props);
        this.state = {
            messages: []
        };

        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    componentDidMount() {
        this.chatMessageSub = WebSocketService.subscribe(
            WebSocketPayloadTypes.ChatMessage,
            (message: ServerChatMessage) => {
                this.setState((prevState) => ({messages: prevState.messages.concat(message)}));
            }
        );
    }

    componentWillUnmount() {
        this.chatMessageSub.unsubscribe();
    }

    onSubmitForm(message: string) {
        WebSocketService.send(new ClientChatMessage(message));
    }

    render() {
        return (
            <div className="Chat" style={{width: '100%', height: '100%', paddingBottom: '10px'}}>
                <Paper
                    style={{
                        width: 'calc( 100% - 20px )',
                        margin: 10,
                        overflowY: 'scroll',
                        height: 'calc( 100% - 80px )'
                    }}
                    className="with-scrollbar"
                >
                    <MessagesList
                        messages={this.state.messages}
                        myName={this.Login}
                    />
                </Paper>
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Chat;
