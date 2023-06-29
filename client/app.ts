const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
const port = 5173;

const jsonParser = bodyParser.json();


//@ts-ignore
app.get('/', (req, res) => {
    res.send('Hello World!');
})

//@ts-ignore
app.post('/config', jsonParser, (req, res) => {
    const config = req.body;
    console.log(req.body)
    res.send(config);
})

app.listen(port, () => {
    console.log("server running on port " + port);
})
