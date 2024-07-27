const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${PORT}`);
})

const blogRoutes = require('./routes/Route');
app.use('/posts/v1', blogRoutes);

const dbConnect = require('./config/database');
dbConnect();

app.get('/', (req, res)=> {
    console.log(`<h1>Homepage</h1>`);
})
