import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from './components';
import { Auth, Profile, ServerPage, ServerSelect } from './pages';

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
