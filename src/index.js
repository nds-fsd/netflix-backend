const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const PORT = 3001;


dotenv.config; // load .env file

app.use(cors()); // enable cors

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`); // print to console when server is running 
});


