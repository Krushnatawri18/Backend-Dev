const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
// uploads files on server
const fileUpload = require('express-fileupload');
app.use(fileUpload({
    useTempFiles: true, // Allows file.tempFilePath to be available
    tempFileDir: '/tmp/', // Ensure this directory exists or set a valid one
    // limits: {fileSize: 10 * 1024}, // To make globally consistent size of media
}));

const Upload = require('./routes/FileUpload');
app.use('/api/v1/upload', Upload);

app.listen(PORT, () => {
    console.log(`Server is started at ${PORT}`)
});

app.get('/', (req, res) => {
    res.send(`<h1>File Upload</h1>`);
});

const { dbConnect } = require('./config/database');
dbConnect();

const cloudinary = require('./config/cloudinary');
cloudinary.cloudinaryConnect();