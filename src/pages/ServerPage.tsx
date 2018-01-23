import * as React from 'react';
import { observer } from 'mobx-react';
import { RouteComponentProps } from 'react-router-dom';

import SERVERS_MOCK_DATA from './servers.mock';
import { REQUEST_STATUS } from '../common/enums';
import { ServerRoom } from '../components/ServerRoom';
import { RequestStatus, Server } from '../common/interfaces';
import WebSocketService from '../services/WebSocketService';

interface ServerPageState extends RequestStatus {
    server: Server;
}

@observer
class ServerPage extends React.Component<RouteComponentProps<any>, ServerPageState> {
    constructor() {
        super();
        this.state = {
            server: null,
            status: REQUEST_STATUS.PENDING
        };
    }

    componentWillMount() {
        const server = SERVERS_MOCK_DATA
            .find((serverItem: Server) => serverItem.code === this.props.match.params.code);
        const status = server != null ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR;

        this.setState({server, status});
        if (status === REQUEST_STATUS.ERROR) {
            return;
        }

        WebSocketService.connectToServer(server.address);
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
