const mongoose = require('mongoose');
const DATABASE_URL = process.env.DATABASE_URL;


mongoose.connect(`mongodb+srv://${DATABASE_URL}/?retryWrites=true&w=majority`);

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

module.exports = mongo;