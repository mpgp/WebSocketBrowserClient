import * as React from 'react';
import { observer } from 'mobx-react';

import { AppStore, DialogsStore } from '../stores';
import { RouteComponentProps } from '../common/interfaces';

interface UserPageProps {
    login: string;
}

@observer
class UserPage extends React.Component<RouteComponentProps<UserPageProps>, {}> {
    componentDidMount() {
        AppStore.setTitle(this.props.match.params.login);
        DialogsStore.setIsOpen(false);
    }

    render() {
        return (
            <div style={{textAlign: 'center'}}>
                <img src={`${process.env.REACT_APP_API_PATH}user/${this.props.match.params.login}/avatar.jpg`} />
            </div>
        );
    }
}

export default UserPage;
