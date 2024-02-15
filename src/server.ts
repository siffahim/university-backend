import colors from 'colors';
import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, logger } from './shared/logger';

async function run() {
  try {
    //database connection
    await mongoose.connect(config.database_url as string);
    logger.info(colors.green('🛢️  Database is connect successfully'));

    //app listening here
    const port =
      typeof config.port === 'number'
        ? config.port
        : parseInt(config.port!) || 5000;

    app.listen(port, '103.145.138.53', () => {
      logger.info(colors.yellow(`Application Running on port ${config.port}`));
    });
  } catch (err) {
    errorLogger.error(`🤢 Failed to connect Database ${err}`);
  }
}

run();
