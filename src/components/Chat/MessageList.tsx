import * as React from 'react';

import './MessageList.scss';
import { DateTimeView, DateModes } from '../Shared';

interface MessageListProps {
    messages: any[];
    myName: string;
}

const Message = (myName: string) => (message: any, index: number) => (
    <p className='Message' key={index}>
        [<DateTimeView Time={message.Time} Mode={DateModes.DateTime}/>]
        &nbsp;
        <span className={'Message__userName' + (myName === message.UserName ? ' bold' : '')}>
            &lt;{message.UserName}&gt;
        </span>
        &nbsp;
        {message.Message}
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
