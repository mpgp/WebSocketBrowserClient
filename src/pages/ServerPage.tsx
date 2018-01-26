import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { REQUEST_STATUS } from '../common/enums';
import { ServerService } from '../services/http';
import { ServerRoom } from '../components/ServerRoom';
import { RequestStatus, Server } from '../common/interfaces';
import WebSocketService from '../services/WebSocketService';

interface ServerPageState extends RequestStatus {
    server: Server;
}

class ServerPage extends React.Component<RouteComponentProps<any>, ServerPageState> {
    constructor(props: RouteComponentProps<any>) {
        super(props);
        this.state = {
            server: null,
            status: REQUEST_STATUS.PENDING
        };
    }

    async componentDidMount() {
        const server = await ServerService.getServer(this.props.match.params.code);
        const status = server ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR;

        this.setState({server, status});
        if (status === REQUEST_STATUS.SUCCESS) {
            WebSocketService.connectToServer(server.address);
        }
    }

    componentWillUnmount() {
        WebSocketService.close();
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = <ServerRoom {...this.state.server}/>;
                break;
            }

            case REQUEST_STATUS.ERROR: {
                body = 'error';
                break;
            }

            default: {
                body = 'spinner ...';
                break;
            }
        }

        return (
            <div className='ServerPage'>
                {body}
            </div>
        );
    }
}

export default ServerPage;
