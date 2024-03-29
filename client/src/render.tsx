import {
  InMemoryCache,
  IntrospectionFragmentMatcher,
} from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { i18n } from 'i18next';
import fetch from 'node-fetch';
import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import ReactDOMServer from 'react-dom/server';
import { I18nextProvider } from 'react-i18next';
import { StaticRouter, Route } from 'react-router-dom';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';
import { QueryParamProvider } from 'use-query-params';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from './styles';
import { theme } from './styles/theme';
import { Root } from './views/root';
import { LocalStateProvider } from './context';

export interface RenderParams {
  /** i18next instance */
  i18n: i18n;
  /** Request pathname */
  location: string;
  /** Built files manifest */
  manifest: { [K: string]: string };
}

export interface RenderResult {
  statusCode: number;
  staticMarkup: string;
}

const render = async (params: RenderParams): Promise<RenderResult> => {
  const context = { statusCode: 200 };
  const sheet = new ServerStyleSheet();

  const App = () => (
    <LocalStateProvider>
        <StaticRouter location={params.location} context={context}>
          <QueryParamProvider ReactRouterRoute={Route}>
            <StyleSheetManager sheet={sheet.instance}>
              <I18nextProvider i18n={params.i18n}>
                <ThemeProvider theme={theme}>
                  <Root />
                </ThemeProvider>
              </I18nextProvider>
            </StyleSheetManager>
          </QueryParamProvider>
        </StaticRouter>
    </LocalStateProvider>
  );

  const content = await getDataFromTree(<App />);
  const helmet = Helmet.renderStatic();
  const additionalElements = sheet.getStyleElement();

  const staticMarkup = ReactDOMServer.renderToStaticMarkup(
    // To use i18next/styled-components inside the Html component, we need to wrap it with providers
    <I18nextProvider i18n={params.i18n}>
      <ThemeProvider theme={theme}>
      </ThemeProvider>
    </I18nextProvider>,
  );

  return {
    staticMarkup,
    statusCode: context.statusCode,
  };
};

export default render;
