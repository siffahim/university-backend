/* eslint-disable no-undef */
import colors from 'colors';
import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function run() {
  let server: Server;
  try {
    //database connection
    await mongoose.connect(config.database_url as string);
    logger.info(colors.green('🛢️  Database is connect successfully'));

    //app listening here
    const port =
      typeof config.port === 'number'
        ? config.port
        : parseInt(config.port!) || 5000;

    server = app.listen(port, '192.168.1.8', () => {
      logger.info(colors.yellow(`Application Running on port ${config.port}`));
    });
  } catch (error) {
    errorLogger.error(`🤢 Failed to connect Database ${error}`);
  }

  process.on('unhandledRejection', error => {
    console.log('Unhandle rejection is detected, we are closing server...');
    if (server) {
      server.close(() => {
        errorLogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

run();
