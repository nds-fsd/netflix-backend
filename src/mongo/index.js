const mongoose = require('mongoose');

mongoose.connect('mongodb://netflix1:netflix1@localhost:27017/prj3?authSource=admin');

const mongo = mongoose.connection;
mongo.on('error', (error) => console.error(error));
mongo.once('open', () => {
    console.log('connected to database');
});

module.exports = mongo;