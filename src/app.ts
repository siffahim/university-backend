import cors from "cors";
import express from "express";
const app = express();

//parser
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json("Hello World");
});

export default app;
