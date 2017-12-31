import * as React from 'react';
import { observer } from 'mobx-react';

import './Chat.scss';
import MessageList from './MessageList';
import AddMessageForm from './AddMessageForm';
import WebSocketStore from '../../stores/WebSocketStore';

@observer
class Chat extends React.Component<{}, {}> {

    onSubmitForm = (message: string) => {
        WebSocketStore.send({
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
                    messages={WebSocketStore.messages}
                    myName={WebSocketStore.userName}
                />
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Chat;
