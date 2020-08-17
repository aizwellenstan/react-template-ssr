import React from 'react';
import { RouteComponentProps } from 'react-router';
import { Page } from 'src/components/page';
import { Seo } from 'src/components/seo';

export const NotFound = () => {

  return (
    <>
      <Seo
        title={'404 Not found'}
      />

      <Page>
        {'404 Not found'}
      </Page>
    </>
  );
};

export const renderNotFound = (props: RouteComponentProps) => {
  const { staticContext } = props;

  if (staticContext) {
    staticContext.statusCode = 404;
  }

  return <NotFound />;
};
