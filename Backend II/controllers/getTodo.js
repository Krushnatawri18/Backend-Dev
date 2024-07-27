const Todo = require('../models/Todo');

exports.getTodos = async (req, res) => {
    try {
        // no condition or params given so fetching all todo items from db using function find()
        const todos = await Todo.find({});
        res.status(200).json(
            {
                success: true,
                data: todos,
                message: "Entire todo data is fetched successfully"
            }
        )
    }
    catch (err) {
        console.error(err);
        res.status(500).json(
            {
                success: false,
                data: err.message,
                message: "Internal server error"
            }
        )
    }
}

exports.getTodoById = async (req, res) => {
    try {
        // extracting id from req.params.id
        const id = req.params.id;
        // fetching specfic id todo data by passing condition 
        const todo = await Todo.findById({ _id: id });

        // sending message if no data found
        if (!todo) {
            return res.status(404).json(
                {
                    success: false,
                    message: "No data found"
                }
            )
        }

        // sending through response if exist
        res.status(200).json(
            {
                success: true,
                data: todo,
                message: `${id} todo data fetched successfully`
            }
        )
    }
    catch (err) {
        console.error(err);
        res.status(500).json(
            {
                success: false,
                data: err.message,
                message: "Internal server error"
            }
        )
    }
}