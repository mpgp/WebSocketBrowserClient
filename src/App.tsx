import * as React from 'react';
import { Route, Switch } from 'react-router-dom';
import * as NotificationSystem from 'react-notification-system';

import Main from './Main';
import { WithRoot } from './hoc';
import { Logout, SignUp, Forgot } from './pages';
import { NotificationService } from './services';

class App extends React.Component<{}, {}> {
    componentDidMount() {
        NotificationService.initialize((this.refs.notificationSystem as NotificationSystem.System));
    }

    render() {
        return (
            <div className="App" style={{ height: '100%' }}>
                <Switch>
                    <Route path="/forgot" component={Forgot}/>
                    <Route path="/logout" component={Logout}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/" component={Main}/>
                </Switch>
                <NotificationSystem ref="notificationSystem" />
            </div>
        );
    }
}

export default WithRoot(App);
