import * as React from 'react';

import { Home, Home2 } from './home';
import Auth from './components/Auth';
import Chat from './components/Chat';
import Game from './components/Game';
import { Link, Route, Switch } from 'react-router-dom';

const App = () => (
    <div className='App'>
        <div className='menu'>
            <ul>
                <li> <Link to='/'>Home</Link> </li>
                <li> <Link to='/home2'>Home2</Link> </li>
            </ul>
        </div>
        <div className='auth'>
            <Switch>
                <Route exact={true} path='/' component={Home}/>
                <Route path='/home2' component={Home2}/>
            </Switch>
        </div>
    </div>
);

export default App;
