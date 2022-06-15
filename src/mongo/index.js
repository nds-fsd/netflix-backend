const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://netflix1:netflix1@cluster0.tgnkat0.mongodb.net/?retryWrites=true&w=majority');

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

module.exports = mongo;