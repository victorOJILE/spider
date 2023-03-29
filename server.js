const path = require('path');
const express = require('express');
const app = new express();
let PORT = process.env.PORT ||  5000;

app.use(express.json());
app.use(express.static('res'));
app.use(express.static('utils'));
app.use(express.static('lib'));
app.use(express.static('images'));
app.get('/',  (req, res) => {
    res.sendFile(path.join(__dirname, 'main', 'index.html'));
});

app.get('/*', (req, res) => {
    res.redirect('./index.html');
});
app.listen(PORT, (err) => {
    if(err) {
        console.log("Error connecting to the server");
    }else {
        console.log("Server listening on port " + PORT);
        }
}); 



