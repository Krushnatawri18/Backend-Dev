const File = require('../models/File');
const cloudinary = require('cloudinary').v2;

// takes file from client and stores on some path in server
exports.localFileUpload = async (req, res) => {
    try {
        // fetching file from request
        const file = req.files.file;
        console.log('File ', file);

        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log('Path ', path);

        // to move file on path
        file.mv(path, (err) => {
            if (err) {
                console.log(err);
            }
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully',
        });

    } catch (err) {
        console.log(err);
    }

    try {
        // fetching file from request
        // file is the name of file that you pass through postman request
        const file = req.files.file;
        // it will print file object which will have name as key and value as name.extention that can be used to find extention
        console.log('File ', file);

        // storing file on server path
        // first need to create files folder in controllers directory
        // if you don't pass extention then Date.now() will be converted to file name in numeric values (eg. 1723287932604)
        // let path = __dirname + '/files/' + Date.now();
        // __dirname gives you current working directory (folder)
        // Date.now() gives milliseconds
        // `.${file.name.split('.')[1]}` adding extention
        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log('Path ', path);

        // to move file on path
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully',
        });

    } catch (err) {
        console.log(err);
    }
}

function isFileTypeSupported(type, supportTypes) {
    return supportTypes.includes(type);
}

async function uploadFileToCloudinary(file, folder, quality, width, height) {
    const options = { 
        folder,
        resource_type: 'auto',
        quality: quality || 'auto', 
        transformation: []
    };

    // If width and height are provided, add them to the transformation
    if (width && height) {
        options.transformation.push({
            width: width,
            height: height,
            crop: 'fit' 
        });
    }
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, options);
        console.log('Upload Result:', result);
        return result;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return null; 
    }
}

exports.imageUpload = async (req, res) => {
    try {
        // fetching data from req.body
        const { name, email, tags } = req.body;
        console.log(name, email, tags);

        const file = req.files ? req.files.imgFile : null;
        console.log(file);

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file was uploaded.',
            });
        }

        // validation
        const supportTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format is not supported',
            });
        }

        // uploading image on Cloudinary
        const response = await uploadFileToCloudinary(file, 'Media');
        console.log(response);

        // saving entry in db
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            message: 'Image uploaded successfully',
        });

    }
    catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Error in uploading image',
        });
    }
}

exports.videoUpload = async(req, res) => {
    try{
        const {name, email, tags} = req.body;
        const file = req.files.videoFile;

        const supportTypes = ['mp4', 'mov'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format is not supported',
            });
        }

        const response = await uploadFileToCloudinary(file, 'Media');
        console.log(response);

        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            message: 'Video uploaded successfully',
        });

    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Error in uploading video',
        });
    }
}

exports.imageReducerUpload = async(req, res) => {
    try{
        const { name, email, tags } = req.body;
        console.log(name, email, tags);

        const file = req.files ? req.files.imgFile : null;

        if (!file) {
            return res.status(400).json({
                success: false,
                message: 'No file was uploaded.',
            });
        }

        const supportTypes = ['jpg', 'jpeg', 'png'];
        const fileType = file.name.split('.')[1].toLowerCase();
        if (!isFileTypeSupported(fileType, supportTypes)) {
            return res.status(400).json({
                success: false,
                message: 'File format is not supported',
            });
        }

        const response = await uploadFileToCloudinary(file, 'Media', 60, 800, 500);

        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl: response.secure_url
        });

        res.json({
            success: true,
            message: 'Reduced image uploaded successfully',
        });
    }
    catch(err){
        console.log(err);
        res.status(400).json({
            success: false,
            message: 'Error in reducing size of image',
        });
    }
}