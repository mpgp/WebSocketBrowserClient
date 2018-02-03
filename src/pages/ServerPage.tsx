import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import AppStore from '../stores/AppStore';
import { REQUEST_STATUS } from '../common/enums';
import { ServerService } from '../services/http';
import ServerRoom from '../components/ServerRoom';
import { RequestStatus } from '../common/interfaces';
import WebSocketService from '../services/WebSocketService';

interface ServerPageProps {
    code: string;
}

class ServerPage extends React.PureComponent<RouteComponentProps<ServerPageProps>, RequestStatus> {
    constructor(props: RouteComponentProps<ServerPageProps>) {
        super(props);
        this.state = { status: REQUEST_STATUS.PENDING };
    }

    async componentDidMount() {
        const server = await ServerService.getServer(this.props.match.params.code);
        const status = server ? REQUEST_STATUS.SUCCESS : REQUEST_STATUS.ERROR;

        this.setState({ status });
        if (status === REQUEST_STATUS.SUCCESS) {
            WebSocketService.connectToServer(server.address);
            AppStore.setTitle(server.name);
        }
    }

    componentWillUnmount() {
        WebSocketService.close();
    }

    render() {
        let body;

        switch (this.state.status) {
            case REQUEST_STATUS.SUCCESS: {
                body = <ServerRoom />;
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
            <div className="ServerPage">
                {body}
            </div>
        );
    }
}

export default ServerPage;
