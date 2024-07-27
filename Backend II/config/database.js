const mongoose = require('mongoose');

// all data written in .env file will be loaded into process object
require('dotenv').config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
        .then(() => { console.log("Database connected successfully") })
        .catch((error) => {
            console.log("Error in database connection");
            console.error(error.message);
            process.exit(1);
        });
}

// exporting dbConnect function
module.exports = dbConnect;
