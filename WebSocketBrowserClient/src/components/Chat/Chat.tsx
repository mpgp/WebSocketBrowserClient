import * as React from 'react';
import * as PropTypes from 'prop-types';

import './Chat.scss';
import AddMessageForm from './AddMessageForm';
import MessageList from './MessageList';


class Chat extends React.Component<{}, {}> {
    static contextTypes = {
        ws: PropTypes.object.isRequired,
        webSocketMessages: PropTypes.arrayOf(PropTypes.shape({
            type: PropTypes.string,
            payload: PropTypes.object
        })),
        userName: PropTypes.string,
    };

    onSubmitForm = (message: string) => {
        const data = {
            type: 'CHAT_MESSAGE',
            payload: {
                Message: message,
                Time: '16:42',
                UserName: this.context.userName
            }
        };
        this.context.ws.send(JSON.stringify(data));
    }

    render() {
        return (
            <div className='Chat'>
                <MessageList
                    messages={this.context.webSocketMessages}
                    myName={this.context.userName}
                />
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Chat;
