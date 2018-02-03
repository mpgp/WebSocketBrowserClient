import * as React from 'react';

import Paper from 'material-ui/Paper';
import AppStore from '../stores/AppStore';
import MessagesList from '../components/MessagesList';
import Listener, { ListenerProps } from '../hoc/Listener';
import WebSocketService from '../services/WebSocketService';
import AddMessageForm from '../components/forms/AddMessageForm';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { ChatMessage as ClientChatMessage } from '../common/interfaces/WebSocketPayloads/Client';
import { ChatMessage as ServerChatMessage } from '../common/interfaces/WebSocketPayloads/Server';

class Chat extends React.PureComponent<ListenerProps<ServerChatMessage>, {}> {
    private login = AppStore.userInfo.login;
    private messages: ServerChatMessage[] = [];

    constructor(props: ListenerProps<ServerChatMessage>) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onSubmitForm(message: string) {
        WebSocketService.send(new ClientChatMessage(message));
    }

    componentWillReceiveProps(nextProps: ListenerProps<ServerChatMessage>) {
        this.messages = [...this.messages, nextProps.message];
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
                        messages={this.messages}
                        myName={this.login}
                    />
                </Paper>
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Listener<ServerChatMessage>(WebSocketPayloadTypes.ChatMessage)(Chat);
