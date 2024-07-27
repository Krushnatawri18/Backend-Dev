// require does work of importing
const express = require('express');
const app = express();

// loading configuration from env file
require('dotenv').config();
// if PORT exists then use that port else 4000
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
})

// to parse data while fetching from req.body
app.use(express.json());

// importing routes
const todoRoutes = require('./routes/todos');

// mounting or adding API routes
// it will take localhost first then /api/v1 and then todoROuters in url path looks like 'localhost/api/v1/todoRouters'
app.use('/api/v1', todoRoutes);

// connecting with database
const dbConnect = require('./config/database');
dbConnect();

// setting default path
app.get('/', (req, res) => {
    console.log(`<h1>This is Home page</h1>`);
})
