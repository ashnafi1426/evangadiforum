const express = require("express");
const app = express();
const port = 5500;

const dbConnection = require("./db/dbconfig");
const userRoutes = require("./Rout/userRoute");

app.use(express.json());
app.use("/api/users", userRoutes);

async function start() {
  try {
    const result = await dbConnection.execute("SELECT 'test'");
    await app.listen(port);
    console.log(`listening on port ${port}`);
    console.log(result);
  } catch (error) {
    console.log(error.message);
  }
}
start();
