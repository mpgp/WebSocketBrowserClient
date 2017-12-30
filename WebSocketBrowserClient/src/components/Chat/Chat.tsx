import * as React from 'react';
import './Chat.scss';
import Message from './Message';


class Chat extends React.Component<{}, {}> {

    render() {
        return (
            <div className='Chat'>
                <Message />
            </div>
        );
    }
}

export default Chat;
