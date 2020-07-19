const express = require('express');

let app = express();    
app.listen(1337, () => {
    console.log("listening on 1337");
})
app.get('/*', (req, res) => {
    res.send("Hello world skrrt");
})