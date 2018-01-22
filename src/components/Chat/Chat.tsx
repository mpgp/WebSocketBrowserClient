import * as React from 'react';
import { observer } from 'mobx-react';

import './Chat.scss';
import MessageList from './MessageList';
import AddMessageForm from './AddMessageForm';
import WebSocketService, { Subscription } from '../../services/WebSocketService';
import { ChatMessage } from '../../common/interfaces/WebSocketPayloads/Server';

interface ChatState {
    messages: ChatMessage[];
}

@observer
class Chat extends React.Component<{}, ChatState> {
    private chatMessageSub: Subscription;
    private Login = JSON.parse(localStorage.getItem('auth')).Login;

    constructor() {
        super();
        this.state = {
            messages: []
        };
    }

    componentWillMount() {
        this.chatMessageSub = WebSocketService.subscribe(
            'CHAT_MESSAGE',
            (message: ChatMessage) => {
                this.setState((prevState) => ({messages: prevState.messages.concat(message)}));
            }
        );
    }

    componentWillUnmount() {
        this.chatMessageSub.unsubscribe();
    }

    onSubmitForm = (message: string) => {
        WebSocketService.send({
            Type: 'CHAT_MESSAGE',
            Payload: {
                Message: message
            }
        });
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
