import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Header from './components/Header';
import ServerPage from './pages/ServerPage';
import ServerSelect from './pages/ServerSelect';

const Main = () => (
    <Auth>
        <Header />
        <Switch>
            <Route path="/" component={ServerSelect} exact={true}/>
            <Route path="/profile" component={Profile}/>
            <Route path="/server/:code" component={ServerPage}/>
            <Redirect to="/"/>
        </Switch>
    </Auth>
);

export default Main;
