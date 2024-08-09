const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
        .then(() => console.log('DB Connection Successful'))
        .catch((err) => {
            console.log('DB Connection Error');
            console.error(err);
            process.exit(1);
        })
};