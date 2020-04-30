var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

//Look for asset files in dist (instead of client)
app.use(express.static('dist'))
//app.use(express.static('src/client'))




console.log("Dir is: " + __dirname)

// Home route of index file
app.get('/', function (req, res) {
    //res.sendFile(path.resolve('src/client/views/index.html'))
    res.sendFile('dist/index.html');
})

// designates what port the app will listen to for incoming requests
const portNumber = 3000;
app.listen(portNumber, function () {
    console.log(`Server running on port ${portNumber}`);
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

console.log("Server is alive! 0.o");
