import * as React from 'react';
import Paper from 'material-ui/Paper';
import withStyles, { WithStyles, StyleRulesCallback } from 'material-ui/styles/withStyles';

import { AppStore } from '../stores';
import { WebSocketService } from '../services';
import { Listener, ListenerProps } from '../hoc';
import { ChatMessagesList, AddMessageForm } from '../components';
import { WebSocketPayloadTypes } from '../common/interfaces/WebSocketPayloads';
import { ChatMessage as ClientChatMessage } from '../common/interfaces/WebSocketPayloads/Client';
import { ChatMessage as ServerChatMessage } from '../common/interfaces/WebSocketPayloads/Server';

type ChatContainerProps = ListenerProps<ServerChatMessage> & WithStyles<'root' | 'Paper'>;

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

class ChatContainer extends React.PureComponent<ChatContainerProps, {}> {
    private login = AppStore.userInfo.login;
    private messages: ServerChatMessage[] = [];

    constructor(props: ChatContainerProps) {
        super(props);
        this.onSubmitForm = this.onSubmitForm.bind(this);
    }

    onSubmitForm(message: string) {
        WebSocketService.send(new ClientChatMessage(message));
    }

    componentWillReceiveProps(nextProps: ChatContainerProps) {
        this.messages = [...this.messages, nextProps.message];
    }

    render() {
        return (
            <div className={this.props.classes.root}>
                <Paper className={'with-scrollbar ' + this.props.classes.Paper}>
                    <ChatMessagesList messages={this.messages} myName={this.login} />
                </Paper>
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Listener<ServerChatMessage>(
    WebSocketPayloadTypes.ChatMessage)(withStyles(styles)<ListenerProps<ServerChatMessage>>(ChatContainer));
