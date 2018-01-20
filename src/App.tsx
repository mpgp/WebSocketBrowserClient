import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Main from './Main';
import Logout from './containers/Logout';
import SignUp from './containers/SignUp';
import Forgot from './containers/Forgot';

const App = () => (
    <div className='App'>
        <Switch>
            <Route path='/forgot' component={Forgot}/>
            <Route path='/logout' component={Logout}/>
            <Route path='/signup' component={SignUp}/>
            <Route path='/' component={Main}/>
        </Switch>
    </div>
);

export { App };
