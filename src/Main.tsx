import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import Auth from './containers/Auth';
import { Header } from './components/Header';
import ServerPage from './containers/ServerPage';
import ServerSelect from './containers/ServerSelect';

const Main = (props: any) => (
    <Auth>
        <Header />
        <Switch>
            <Route path='/' component={ServerSelect} exact={true}/>
            <Route path='/server/:code' component={ServerPage}/>
            <Redirect to='/'/>
        </Switch>
    </Auth>
);

export default Main;
