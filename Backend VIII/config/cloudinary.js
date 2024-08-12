const cloudinary = require('cloudinary').v2;
require('dotenv').config();

exports.cloudinaryConnect = () => {
    try{
        // function sets up the necessary credentials and configuration options that allow your application to interact with the Cloudinary API
        cloudinary.config({
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET,
        });
    }
    catch(err){
        console.error(err);
    }
}