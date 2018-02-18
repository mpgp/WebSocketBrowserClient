import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as NotificationSystem from 'react-notification-system';

import Main from './Main';
import { WithRoot } from './hoc';
import { LogoutPage, SignUpPage, ForgotPage } from './pages';
import { NotificationService } from './services';

class App extends React.Component<{}, {}> {
    componentDidMount() {
        NotificationService.initialize((this.refs.notificationSystem as NotificationSystem.System));
    }

    render() {
        return (
            <div className="App" style={{ height: '100%' }}>
                <Switch>
                    <Route path="/forgot" component={ForgotPage}/>
                    <Route path="/logout" component={LogoutPage}/>
                    <Route path="/signup" component={SignUpPage}/>
                    <Route path="/" component={Main}/>
                </Switch>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

export default WithRoot(App);
