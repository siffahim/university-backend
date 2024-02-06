import colors from "colors";
import dotenv from "dotenv";

import mongoose from "mongoose";
import app from "./app";

dotenv.config();

const port = 5000;

async function run() {
  try {
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lyhqa.mongodb.net/?retryWrites=true&w=majority`
    );
    console.log(colors.bgGreen("🚀 Database is connect successfully"));

    app.listen(port, () => {
      console.log(colors.bgYellow(`Application Running on port ${port}`));
    });
  } catch (err) {
    console.error(`🤢 Failed to connect Database ${err}`);
  }
}

run();
