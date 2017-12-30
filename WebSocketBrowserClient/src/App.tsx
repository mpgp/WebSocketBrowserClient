import * as React from 'react';

import Chat from './components/Chat';
import Auth from './components/Auth';

class App extends React.Component<{}, {}> {

    render() {
        return (
            <div className='App'>
                <Auth>
                    <Chat/>
                </Auth>
            </div>
        );
    }
}

export default App;
