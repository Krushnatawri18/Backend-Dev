const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DB_URL)
    .then(() => console.log('DB Connection Successful'))
    .catch((err) => {
        console.error(err);
        console.log('DB Connection Unsuccessful');
        process.exit(1);
    });
}