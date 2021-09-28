
const express = require('express');
const path = require('path');

const app = express();
app.set('port',3000);

app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    console.log(req.method, req.url);
    next();
});

app.get('/', function(req,res){
    console.log('Mean game');
});

const server = app.listen(app.get('port'), function() {
    console.log(`Server is listening on ${server.address().port}`);
});