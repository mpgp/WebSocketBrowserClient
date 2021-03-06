import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from './components';
import { AuthPage, ProfilePage, ServerPage, ServerSelectPage, UserPage } from './pages';

const Main = () => (
    <AuthPage>
        <Header />
        <Switch>
            <Route path="/" component={ServerSelectPage} exact={true} />
            <Route path="/profile" component={ProfilePage} />
            <Route path="/server/:code" component={ServerPage} />
            <Route path="/user/:login" component={UserPage} />
            <Redirect to="/" />
        </Switch>
    </AuthPage>
);

export default Main;
