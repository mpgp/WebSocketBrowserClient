import * as React from 'react';

import MessageList from '../components/MessageList';
import AddMessageForm from '../components/forms/AddMessageForm';
import WebSocketService, { Subscription } from '../services/WebSocketService';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { ChatMessage as ClientChatMessage} from '../common/interfaces/WebSocketPayloads/Client';
import { ChatMessage as ServerChatMessage } from '../common/interfaces/WebSocketPayloads/Server';

interface ChatState {
    messages: ServerChatMessage[];
}

class Chat extends React.Component<{}, ChatState> {
    private chatMessageSub: Subscription;
    private Login = JSON.parse(localStorage.getItem('auth')).login;

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
            <div className='Chat'>
                <MessageList
                    messages={this.state.messages}
                    myName={this.Login}
                />
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Chat;
