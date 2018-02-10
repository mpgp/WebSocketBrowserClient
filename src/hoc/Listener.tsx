import * as React from 'react';
import { StyledComponentProps } from 'material-ui';

import { WebSocketService, Subscription } from '../services';
import { BaseMessage } from '../common/interfaces/WebSocketPayloads';

export interface ListenerProps<T> {
    message: T;
}

type WrappedProps<T> = ListenerProps<T> | StyledComponentProps<'root'>;

const Listener = <T extends BaseMessage>(messageType: string) => (Component: React.ComponentType<WrappedProps<T>>) => {
    return class extends React.PureComponent<{}, ListenerProps<T>> {
        static displayName = `Listener(${Component.displayName || Component.name})`;
        private chatMessageSub: Subscription;

        constructor(props: ListenerProps<T>) {
            super(props);
            this.state = { message: {} as T };
        }

        componentDidMount() {
            this.chatMessageSub = WebSocketService.subscribe(
                messageType,
                (message: T) => {
                    this.setState({message});
                }
            );
        }

        componentWillUnmount() {
            this.chatMessageSub.unsubscribe();
        }

        render() {
            return <Component {...this.props} message={this.state.message} />;
        }
    };
};

export default Listener;
