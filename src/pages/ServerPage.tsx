import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStore } from '../stores';
import { ServerRoom } from '../components';
import { REQUEST_STATUS } from '../common/enums';
import { RequestStatus, RouteComponentProps } from '../common/interfaces';
import { ServerService, WebSocketService } from '../services';

interface ServerPageProps {
    code: string;
}

@observer
class ServerPage extends React.Component<RouteComponentProps<ServerPageProps>, RequestStatus> {
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
