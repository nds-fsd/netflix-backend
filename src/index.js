const express = require("express");
const mongo = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const PORT = 3001;

dotenv.config(); // load .env file
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
); 

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`); // print to console when server is running
});
