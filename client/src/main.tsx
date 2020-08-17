import { BrowserRouter, Route } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';
import { theme } from 'src/styles/theme';
import { ThemeProvider } from 'src/styles';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';
import React from 'react';
import ReactDOM from 'react-dom';

// import { StoreContext } from 'redux-react-hook';
import { LocalStateProvider } from './context';
import { Root } from './views/root';

(async () => {
  if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install();
  }

  const mountNode = document.getElementById('root');
  if (!mountNode) return;

  ReactDOM.render(
    <LocalStateProvider>
        <BrowserRouter>
          <QueryParamProvider ReactRouterRoute={Route}>
              <ThemeProvider theme={theme}>
                <Root />
              </ThemeProvider>
          </QueryParamProvider>
        </BrowserRouter>
    </LocalStateProvider>,
    mountNode,
  );
})();
