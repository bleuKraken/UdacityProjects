var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

/* app.use(express.static('src/client')) */
// Updateing server file to look for asset files in the dist instead of client
app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    /* res.sendFile('/client/views/index.html', { root: __dirname + '/..' }) */
    // Updateing home route to use index file from dist.
    res.sendFile('dist/index.html')
})

const port = 8080;
// designates what port the app will listen to for incoming requests
app.listen(port, function () {
    console.log(`Example app listening on port: ${port}`);
})


app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})
