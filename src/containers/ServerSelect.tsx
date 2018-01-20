import * as React from 'react';
import SERVERS_MOCK_DATA from './servers.mock';
import { REQUEST_STATUS } from '../common/enums';
import { ServersList } from '../components/ServersList';
import { RequestStatus, Server } from '../common/interfaces';

interface ServerSelectState extends RequestStatus {
    servers: Server[];
}

class ServerSelect extends React.Component<{}, ServerSelectState> {
    constructor() {
        super();
        this.state = {
            servers: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    componentWillMount() {
        setTimeout(() => {
            const servers = SERVERS_MOCK_DATA;
            const status = servers.length > 0 ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR;

            this.setState({
                servers,
                status
            });
        }, 1000);
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = <ServersList servers={this.state.servers}/>;
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
            <div className='ServerSelect'>
                {body}
            </div>
        );
    }
}

export default ServerSelect;
