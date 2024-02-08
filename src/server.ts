import colors from 'colors';
import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function run() {
  try {
    //database connection
    await mongoose.connect(config.database_url as string);
    console.log(colors.bgGreen('🚀 Database is connect successfully'));

    //app listening here
    app.listen(config.port, () => {
      console.log(
        colors.bgYellow(`Application Running on port ${config.port}`)
      );
    });
  } catch (err) {
    console.error(`🤢 Failed to connect Database ${err}`);
  }
}

run();
