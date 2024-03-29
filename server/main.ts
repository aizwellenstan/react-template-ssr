import path from 'path';
import express from 'express';
import cors from 'cors';
import { BIND_PORT } from './config';
import { routes } from './routes';

const arts = require.resolve('../arts');
const client = require.resolve('../client');

(async () => {
  const artsStatic = path.resolve(arts, '../static');
  const clientStatic = path.resolve(client, '../../static');

  // Express
  const app = express()
    .use(cors())
    .use(express.static(artsStatic))
    .use(express.static(clientStatic))
    .use(routes);

  app.listen(process.env.PORT || { port: BIND_PORT }, () => {
    // eslint-disable-next-line no-console
    console.log('🎉 Server is running at ' + `http://localhost:${BIND_PORT}`);
  });
})();
