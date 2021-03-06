import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStore } from '../stores';
import { ServerService } from '../services';
import { ServersList } from '../components';
import { REQUEST_STATUS } from '../common/enums';
import { RequestStatus, Server } from '../common/interfaces';

interface ServerSelectState extends RequestStatus {
    servers: Server[];
}

@observer
class ServerSelectPage extends React.Component<{}, ServerSelectState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            servers: [],
            status: REQUEST_STATUS.PENDING
        };
    }

    async componentDidMount() {
        const servers = await ServerService.getServers();
        const status = servers && servers.length > 0 ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR;
        this.setState({
            servers,
            status
        });
        AppStore.setTitle('Multiplayer Game Platform');
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = <ServersList servers={this.state.servers} />;
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
            <div className="ServerSelect">
                {body}
            </div>
        );
    }
}

export default ServerSelectPage;
