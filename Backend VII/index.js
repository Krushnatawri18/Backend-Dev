const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server started at ${PORT}`);
});

const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());

const user = require('./routes/User');
app.use('/api/v1', user);

const { dbConnect } = require('./config/database');
dbConnect();

app.get('/', (req, res) => {
    res.send(`<h1>Authentication and Authorization</h1>`);
});
