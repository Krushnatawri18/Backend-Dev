const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`App is running on ${port}`);
});

app.get('/', (req, res) => {
    res.send(`<h1>This is home page</h1>`);
});

app.post('/post', (req, res) => {
    res.send("Post is requested");
})
