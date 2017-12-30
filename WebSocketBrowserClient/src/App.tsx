import * as React from 'react';

import Auth from './components/Auth';
import Chat from './components/Chat';
import Game from './components/Game';

const App = () => (
    <div className='App'>
        <Auth>
            <Game />
            <Chat/>
        </Auth>
    </div>
);

export default App;
