import * as React from 'react';

import './MessageList.scss';
import { WebSocketMessage } from '../../stores/WebSocketStore';


interface MessageListProps {
    messages: WebSocketMessage[];
    myName: string;
}

const Message = (myName: string) => (message: WebSocketMessage, index: number) => (
    message.Type === 'CHAT_MESSAGE' || message.Type === 'AUTH_MESSAGE' ?
        <p className='Message' key={index}>
            [{message.Payload.Time }]
            &nbsp;
            <span className={'Message__userName' + (myName === message.Payload.UserName ? ' bold' : '')}>
                &lt;{ message.Payload.UserName }&gt;
            </span>
            &nbsp;
            {
                message.Type === 'CHAT_MESSAGE'
                ? message.Payload.Message
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
