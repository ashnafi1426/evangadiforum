const express = require("express");
const cors = require("cors"); // ✅ require first
const app = express();
const port = 5500;

app.use(cors()); // ✅ now it's defined
app.use(express.json());

const dbConnection = require("./db/dbConfig");

// Routes
const userRoutes = require("./rout/userRoute");
const questionRoute = require("./rout/questionRoute");

const authMiddleware = require("./middleware/authMiddleware");

// Use routes
app.use("/api/users", userRoutes);
app.use("/api/question", authMiddleware, questionRoute);

// Start server
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
