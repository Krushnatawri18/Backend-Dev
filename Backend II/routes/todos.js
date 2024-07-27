const express = require('express');
const router = express.Router();

// importing controller for each path
const {createTodo} = require('../controllers/createTodo');
const {getTodos, getTodoById} = require('../controllers/getTodo');
const {updateTodo} = require('../controllers/updateTodo');
const {deleteTodo} = require('../controllers/deleteTodo');

// creating api routes
router.post('/createTodo', createTodo);
router.get('/getTodos', getTodos);
router.get('/getTodos/:id', getTodoById);
router.put('/updateTodo/:id', updateTodo);
router.delete('/deleteTodo/:id', deleteTodo);

// exporting router to server file
module.exports = router;