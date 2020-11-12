import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import findConfig from 'find-config';
import compression from 'compression';

import routes from './app/routes';
import error from './app/middlewares/error';
import { MongoConnection } from './mongo-connection';
import logger from './logger';

const prod = process.env.NODE_ENV === 'production';

dotenv.config({ path: findConfig(`.env.${prod ? 'prod' : 'default'}`) });

const mongoConnection = new MongoConnection(process.env.MONGO_URL);

const app = express();

app.set('port', process.env.PORT || 3333);

app.use(compression());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

app.use('/', routes);

app.use('/*', (req, res) => res.send('Not Found'));

app.use(error.converter);

app.use(error.notFound);

app.use(error.handler);

mongoConnection.connect(() => {
  app.listen(app.get('port'), (): void => {
    console.log('\x1b[36m%s\x1b[0m', `Express server started at http://localhost:${app.get('port')}`);
  });
});

process.on('SIGINT', () => {
  logger.info('Gracefully shutting down');
  mongoConnection.close((err) => {
    if (err) {
      logger.log({
        level: 'error',
        message: 'Error shutting closing mongo connection',
        error: err,
      });
    }
    process.exit(0);
  });
});
