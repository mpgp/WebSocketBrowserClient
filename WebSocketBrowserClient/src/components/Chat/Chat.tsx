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
            type: 'CHAT_MESSAGE',
            payload: {
                Message: message,
                Time: '16:42',
                UserName: WebSocketStore.userName
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
