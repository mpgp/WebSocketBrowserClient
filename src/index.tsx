import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import 'index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const Root = () => (
    <BrowserRouter>
      <App />
    </BrowserRouter>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
