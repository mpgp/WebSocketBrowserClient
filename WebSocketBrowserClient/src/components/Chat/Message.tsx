import * as React from 'react';
import * as PropTypes from 'prop-types';

import './Message.scss';


class Message extends React.Component<{}, {}> {
    static contextTypes = {
        ws: PropTypes.object.isRequired,
        message: PropTypes.string
    };

    render() {
        console.warn(this.context);
        return (
            <div className='Message'>
                <h1>Hello React!</h1>
            </div>
        );
    }
}

export default Message;
