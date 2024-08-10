const File = require('../models/File');

// takes file from client and stores on some path in server
exports.localFileUpload = async(req, res) => {
    try{
        // fetching file from request
        const file = req.files.file;
        console.log('File ', file);

        let path = __dirname + '/files/' + Date.now() + `.${file.name.split('.')[1]}`;
        console.log('Path ',path);

        // to move file on path
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully',
        });

    }catch(err){
        console.log(err);
    }

    try{
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
        console.log('Path ',path);

        // to move file on path
        file.mv(path, (err) => {
            console.log(err);
        });

        res.json({
            success: true,
            message: 'Local file uploaded successfully',
        });

    }catch(err){
        console.log(err);
    }
}