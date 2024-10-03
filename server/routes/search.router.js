require('dotenv').config();
const express = require('express');
const axios = require('axios');
const router = express.Router();


// sends a search query to GIPHY and it sends back relevant gifs based on the search
router.get('/', (req, res) => {
    console.log('running', req.body);
    axios.get(`http://api.giphy.com/v1/gifs/search?api_key=${process.env.GIPHY_API_KEY}&q=${req.body}&limit=15`).then((response) => {
        res.send(response.data);
        console.log(response.data);
    }).catch( err => {
        console.log(err);
        res.sendStatus(500);
    });
})

module.exports = router;