const express = require("express");
const cors = require("cors");
const app = express();
const port = 5500;

app.use(cors());
app.use(express.json());

const dbConnection = require("./db/dbConfig");

const userRoutes = require("./rout/userRoute");
const questionRoutes = require("./rout/questionRoute");

app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test'");
    await app.listen(port);
    console.log(`Server running on port ${port}`);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
start();
