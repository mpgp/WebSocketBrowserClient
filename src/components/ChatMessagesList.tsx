import * as React from 'react';
import List, { ListItem } from 'material-ui/List';

import { DateTimeView, DateModes } from './';
import { ChatMessage } from '../common/interfaces/WebSocketPayloads/Server';

interface MessagesListProps {
    messages: ChatMessage[];
    myName: string;
}

const ChatMessageItem = (myName: string) => ({Login, Message, Time}: ChatMessage, index: number) => (
    <ListItem key={index} style={{color: '#666'}}>
        [<DateTimeView Time={Time} Mode={DateModes.Time}/>]
        &nbsp;
        <span style={{color: '#000', fontWeight: (myName === Login ? 'bold' : 'normal')}}>
            &lt;{Login}&gt;
        </span>
        &nbsp;
        {Message}
    </ListItem>
);

const ChatMessagesList = ({messages, myName}: MessagesListProps) => (
    <List className="MessageList">
        {
            messages.length > 0
                ? messages.map(ChatMessageItem(myName))
                : <ListItem>No messages...</ListItem>
        }
    </List>
);

export default ChatMessagesList;
