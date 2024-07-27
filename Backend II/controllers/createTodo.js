// creating a new Todo object by fetching user data from request.body from POST request and inserting into database

const Todo = require('../models/Todo');

// another way to export
// made it async so that it doesn't halt main thread
exports.createTodo = async (req, res) => {
    try {
        // fetching title and description from request body which will be given by us by POST request
        const { title, description } = req.body;
        // creating new Todo object and inserting into database with create operation (db interaction)
        const response = await Todo.create({ title, description });
        // make status is 'okay' send json response with a success flag
        res.status(200).json(
            {
                success: true,
                data: response,
                message: "Entry created successfully"
            }
        )
    }
    catch (err) {
        console.error(err);
        console.log(err);
        // make status is 'internal server error'
        res.status(500).json(
            {
                success: false,
                data: err.message,
                message: "Internal server error"
            }
        )
    }
}