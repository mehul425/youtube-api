const express = require('express');
const bodyParser = require('body-parser');
const scrapeYt = require("scrape-yt");

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
        var x = await scrapeYt.getVideo(slug);
        res.status(200).json(x);
    } catch (e) {
        res.status(500).json({ "error": JSON.stringify(e) });
    }

});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))
