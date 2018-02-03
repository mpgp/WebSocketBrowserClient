import * as React from 'react';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import Paper from 'material-ui/Paper';
import AppStore from '../stores/AppStore';
import MessagesList from '../components/MessagesList';
import Listener, { ListenerProps } from '../hoc/Listener';
import WebSocketService from '../services/WebSocketService';
import AddMessageForm from '../components/forms/AddMessageForm';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { ChatMessage as ClientChatMessage } from '../common/interfaces/WebSocketPayloads/Client';
import { ChatMessage as ServerChatMessage } from '../common/interfaces/WebSocketPayloads/Server';

type ChatProps = ListenerProps<ServerChatMessage> & WithStyles<'root' | 'Paper'>;

const styles: StyleRulesCallback<'root'> = () => ({
    root: {
        width: '100%',
        height: '100%',
        paddingBottom: '10px'
    },
    Paper: {
        margin: 10,
        overflowY: 'scroll',
        width: 'calc( 100% - 20px )',
        height: 'calc( 100% - 80px )'
    }
});

class Chat extends React.Component<ChatProps, {}> {
    private login = AppStore.userInfo.login;
    private messages: ServerChatMessage[] = [];

    constructor(props: ChatProps) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onSubmitForm(message: string) {
        WebSocketService.send(new ClientChatMessage(message));
    }

    componentWillReceiveProps(nextProps: ChatProps) {
        this.messages = [...this.messages, nextProps.message];
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Paper className={'with-scrollbar ' + this.props.classes.Paper}>
                    <MessagesList messages={this.messages} myName={this.login} />
                </Paper>
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Listener<ServerChatMessage>(
    WebSocketPayloadTypes.ChatMessage)(withStyles(styles)<ListenerProps<ServerChatMessage>>(Chat));
