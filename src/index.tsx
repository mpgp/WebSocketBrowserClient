import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { BrowserRouter } from 'react-router-dom';

import { App } from './App';

const rootEl = document.getElementById('root');
ReactDOM.render(
  <AppContainer>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContainer>,
  rootEl
);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept('./App', () => {
    const NextApp = require<{default: typeof App}>('./App').default;
    ReactDOM.render(
      <AppContainer>
        <BrowserRouter>
          <NextApp />
        </BrowserRouter>
      </AppContainer>
      ,
      rootEl
    );
  });
}
