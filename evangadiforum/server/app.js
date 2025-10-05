const express = require("express");
const cors = require("cors");
const questionRoute = require("./routes/questionRoute");

const app = express();

app.use(cors());
app.use(express.json()); // Important! Parses JSON body

app.use("/api/questions", questionRoute);

const PORT = 5500;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
