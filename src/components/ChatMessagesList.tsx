import * as React from 'react';
import List, { ListItem } from 'material-ui/List';

import { DateTimeView, DateModes } from './';
import { ChatMessage } from '../common/interfaces/WebSocketPayloads/Server';

interface MessagesListProps {
    messages: ChatMessage[];
    myName: string;
}

const ChatMessageItem = (myName: string) => (chatMessage: ChatMessage, index: number) => (
    <ListItem key={index} style={{color: '#666'}}>
        [<DateTimeView Time={chatMessage.Time} Mode={DateModes.DateTime}/>]
        &nbsp;
        <span style={{color: '#000', fontWeight: (myName === chatMessage.Login ? 'bold' : 'normal')}}>
            &lt;{chatMessage.Login}&gt;
        </span>
        &nbsp;
        {chatMessage.Message}
    </ListItem>
);

const ChatMessagesList = (props: MessagesListProps) => (
    <div className="MessageList">
        {
            props.messages.length > 0
                ? <List>
                    {props.messages.map(ChatMessageItem(props.myName))}
                  </List>
                : <p>No messages...</p>
        }
    </div>
);

export default ChatMessagesList;
