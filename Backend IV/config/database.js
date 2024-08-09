const mongoose = require('mongoose');

require('dotenv').config();

const connectWithDB = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.error('Error connecting to MongoDB', err);
    });
}

module.exports = connectWithDB;