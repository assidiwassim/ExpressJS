const express = require('express');
const app = express();
var Request = require("request");

app.set('view engine', 'ejs')



app.get('/', (req, res) => {
    res.render(__dirname + '/index.ejs')
    // Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
    // Mine was '/Users/zellwk/Projects/demo-repos/crud-express-mongo' for this app.
})

app.post('/result', (req, res) => {
    Request.get("https://facebook.com", (error, response, body) => {
        if(error) {
            resu='err';
            res.render(__dirname + '/result.ejs',{resu:resu});
            return console.log("err");
         }
         resu=body;
        res.render(__dirname + '/result.ejs',{resu:resu});
        return console.log("okk");
     });
})

app.listen(80, function() {
    



    console.log('listening on 80')
})


