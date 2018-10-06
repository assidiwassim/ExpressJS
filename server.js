const express = require('express');
const app = express();
var Request = require("request");


Request.get("https://google.com", (error, response, body) => {
   if(error) {
        return console.log("err");
    }
    console.dir(body);
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.listen(80, function() {
    



    console.log('listening on 80')
})


