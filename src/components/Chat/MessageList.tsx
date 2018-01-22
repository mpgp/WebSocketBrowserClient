import * as React from 'react';

import './MessageList.scss';
import { DateTimeView, DateModes } from '../Shared';
import { ChatMessage } from '../../common/interfaces/WebSocketPayloads/Server';

interface MessageListProps {
    messages: ChatMessage[];
    myName: string;
}

const Message = (myName: string) => (chatMessage: ChatMessage, index: number) => (
    <p className='Message' key={index}>
        [<DateTimeView Time={chatMessage.Time} Mode={DateModes.DateTime}/>]
        &nbsp;
        <span className={'Message__userName' + (myName === chatMessage.UserName ? ' bold' : '')}>
            &lt;{chatMessage.UserName}&gt;
        </span>
        &nbsp;
        {chatMessage.Message}
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
