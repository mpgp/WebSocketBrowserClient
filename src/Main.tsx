import * as React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Header } from './components/Header';
import ServerPage from './containers/ServerPage';
import ServerSelect from './containers/ServerSelect';

const Main = (props: any) => (
    <div className='Main'>
        <Header />
        <Switch>
            <Route path='/' component={ServerSelect} exact={true}/>
            <Route path='/server/:code' component={ServerPage}/>
            <Redirect to='/'/>
        </Switch>
    </div>
);

export default Main;
