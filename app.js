const express = require('express');
const bodyParser = require('body-parser');
const { Client } = require("youtubei");
var CircularJSON = require('circular-json');
const app = express();
const port = 4000;
const youtube = new Client();

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/getVideo/', async (req, res) => {
var url = req.query.id;
console.log(url);

var slug = url.substring(url.indexOf("=") + 1, url.length);
console.log(slug);
try {
var x = await youtube.getVideo(slug);
res.status(200).set("Access-Control-Allow-Origin", "*")
.set("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE")
.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
.json(JSON.parse(CircularJSON.stringify(x)));
} catch (e) {
console.log(e);
res.status(500).json({ "error": JSON.stringify(e) });
}

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
