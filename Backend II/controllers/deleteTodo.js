const Todo = require('../models/Todo');

exports.deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        // await Todo.deleteOne({_id: id});

        res.status(200).json(
            {
                success: true,
                message: "Entry deleted successfully"
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
