const express = require('express');
const app = express();

require('dotenv').config();
app.use(express.json());

const PORT = process.env.PORT || 4000;

app.listen(process.env.PORT, () => {
    console.log(`Server started at ${PORT}`);
})

const routes= require('./routes/BlogRoutes');
app.use('/posts/v1', routes);

const connectWithDB = require('./config/database');
connectWithDB();

app.get('/', (req, res)=> {
    res.send(`<h1>Homepage</h1>`);
})
