const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log("Server initialized on port number 3000");
});

app.get('/', (request, response) => {
    response.send("Hii, Server started displaying on localhost:3000");
});

app.post('/api/cars', (request, response) => {
    const {name, brand} = request.body;
    console.log(name, brand);
    response.send("Posted car data successfully");
});

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/myDatabase', {
    useNewUrlParser:true,
    useUnifiedTopology:true
})

.then(() => {console.log("Connection successful")})
.catch((error) => {console.log("Connection successful")})