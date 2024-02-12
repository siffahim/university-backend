import colors from 'colors';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function run() {
  try {
    //database connection
    await mongoose.connect(config.database_url as string);
    console.log(colors.green('🛢️  Database is connect successfully'));

    //app listening here
    const port =
      typeof config.port === 'number'
        ? config.port
        : parseInt(config.port!) || 5000;

    app.listen(port, '192.168.10.16', () => {
      console.log(colors.yellow(`Application Running on port ${config.port}`));
    });
  } catch (err) {
    console.error(`🤢 Failed to connect Database ${err}`);
  }
}

run();
