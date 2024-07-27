const Todo = require('../models/Todo');

exports.updateTodo = async (req, res) => {
    try {
        // another way to extract id from req.params
        const { id } = req.params;
        const { title, description } = req.body;

        // finding todo by id and updating new data with condition and params
        const todo = await Todo.findByIdAndUpdate(
            { _id: id },
            { title, description, updatedAt: Date.now() }
        )

        res.status(200).json(
            {
                success: true,
                data: todo,
                message: `Updated ${id} todo successfully`
            }
        )
    }
    catch (err) {
        console.error(err);
        console.log(err);
        res.status(500).json(
            {
                success: false,
                data: err.message,
                message: "Internal server error"
            }
        )
    }
}