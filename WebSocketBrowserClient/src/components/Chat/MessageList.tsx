import * as React from 'react';

import './MessageList.scss';

export interface MessageListProps {
    messages: string[];
    myName: string;
}

const Message = (myName: string) => (message: string, index: number) => (
    <p className='Message' key={index}>
        { message }
    </p>
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
