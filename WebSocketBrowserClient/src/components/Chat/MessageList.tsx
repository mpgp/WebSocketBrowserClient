import * as React from 'react';

import './MessageList.scss';
import { WebSocketMessage } from '../../stores/WebSocketStore';


interface MessageListProps {
    messages: WebSocketMessage[];
    myName: string;
}

const Message = (myName: string) => (message: WebSocketMessage, index: number) => (
    message.type === 'CHAT_MESSAGE' || message.type === 'AUTH'
    ?
    <p className='Message' key={index}>
        [{ message.payload.Time }]
        &nbsp;
        <span className={'Message__userName' + (myName === message.payload.UserName ? ' bold' : '')}>
            &lt;{ message.payload.UserName }&gt;
        </span>
        &nbsp;
        {
            message.type === 'CHAT_MESSAGE'
            ? message.payload.Message
            : 'was joined to chat!'
        }
    </p>
    : null
);

const MessageList = (props: MessageListProps) => (
    <div className='MessageList'>
        {
            props.messages.length > 0
            ? props.messages.map(Message(props.myName))
            : <p>No messages...</p>
        }
    </div>
);

export default MessageList;
