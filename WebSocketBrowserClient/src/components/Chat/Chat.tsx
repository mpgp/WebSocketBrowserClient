import * as React from 'react';
import * as PropTypes from 'prop-types';

import './Chat.scss';
import AddMessageForm from './AddMessageForm';
import MessageList from './MessageList';


class Chat extends React.Component<{}, {}> {
    static contextTypes = {
        ws: PropTypes.object.isRequired,
        message: PropTypes.string,
        chatMessages: PropTypes.arrayOf(PropTypes.string)
    };

    onSubmitForm = (userName: string) => {
        this.context.ws.send(userName);
    };

    render() {
        return (
            <div className='Chat'>
                <MessageList messages={this.context.chatMessages} myName={'admin'} />
                <AddMessageForm onSubmit={this.onSubmitForm} />
            </div>
        );
    }
}

export default Chat;
