import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Auth from './containers/Auth';
import Logout from './containers/Logout';
import SignUp from './containers/SignUp';

const App = () => (
    <div className='App'>
        <Auth>
            <Switch>
                <Route path='/logout' component={Logout}/>
                <Route path='/signup' component={SignUp}/>
                <Route path='/' component={Main}/>
            </Switch>
        </Auth>
    </div>
);

export { App };
