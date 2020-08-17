import path from 'path';
import express from 'express';
import request from 'request';

import render from '../../client';
// import manifest from '../../client/static/build/manifest.json';
import manifest from '../../client/static/build/manifest.json';

const client = require.resolve('../../client');

const router = express.Router();

// Service worker
router.use('/sw.js', (_, res) => {
  res.sendFile(path.resolve(client, '../../static/build/sw.js'));
});

// Progressive web app
router.use('/manifest.json', ({ i18n } :any, res) => {
  res.json({
    name: i18n.t('meta.title', { defaultValue: 'Refined Slack Clone' }),
    short_name: i18n.t('meta.title_short', { defaultValue: 'Rsc' }),
    display: 'standalone',
    icons: [
      {
        src: '/android-chrome.png',
        size: '250x250',
        type: 'image/png',
      },
    ],
    start_url: '/activities',
    theme_color: '#F80652',
    background_color: '#C70542',
  });
});

// Server side rendering
router.use(async (req: any, res) => {
  const result = await render({
    manifest,
    i18n: req.i18n,
    location: req.url,
  });

  res.status(result.statusCode);
  res.send(`<!DOCTYPE html>\n${result.staticMarkup}`);
});

// router.use('/*', (_, res) => {
//   res.sendFile(path.resolve(staticDir, 'index.html'));
// });

export const routes = router;
