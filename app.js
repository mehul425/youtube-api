const express = require('express');
const bodyParser = require('body-parser');
const ytScraper = require("yt-scraper")

const app = express();
const port = 4000;

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get('/getVideo/', async (req, res) => {
var url = req.query.id;
console.log(url);

var slug = url.substring(url.indexOf("=") + 1, url.length);
console.log(slug);
try {
var x = await ytScraper.videoInfo(slug);
res.status(200).json(x);
} catch (e) {
console.log(slug);
res.status(500).json({ "error": JSON.stringify(e) });
}

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
