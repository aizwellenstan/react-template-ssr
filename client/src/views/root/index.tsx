import React, { useContext } from 'react';
import { Route, Switch} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { styled, ThemeContext } from 'src/styles';
import { renderNotFound } from 'src/views/not-found';
import { GlobalStyle } from 'src/styles/global-style';
import { Seo } from 'src/components/seo';

const Wrapper = styled.main`
  display: flex;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-color: ${({ theme }) => theme.backgroundWash};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const Root = () => {
  const { t } = useTranslation();

  const theme = useContext(ThemeContext);
  const rootUrl = process.env.PUBLIC_URL;

  return (
    <>
      <Seo
        title={t('meta.title', {
          defaultValue: 'Refined Slack Clone',
        })}
        description={t('meta.description', {
          defaultValue: '✨ slack clone refined interface!',
        })}
      />

      <Helmet>
        <meta name="theme-color" content={theme.highlightNormal} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />

        <link
          rel="mask-icon"
          href="/mask-icon.svg"
          color={theme.highlightNormal}
        />

        <meta
          name="apple-mobile-web-app-title"
          content={t('meta.title', {
            defaultValue: 'Refined Slack Clone',
          })}
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta property="og:url" content={rootUrl} />
        <meta property="og:image" content={`${rootUrl}/screenshot.png`} />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <Wrapper>
        <Content>
          <Switch>
            <Route render={renderNotFound} />
          </Switch>
        </Content>
      </Wrapper>

      <GlobalStyle />
    </>
  );
};
