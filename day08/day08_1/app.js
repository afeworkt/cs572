require("dotenv").config({"path":".env"});
const express = require('express');
const path = require('path');
require('./api/data/db')
const routes=require('./api/routes')

const app = express();

app.set('port',process.env.PORT);

app.use("/node_modules",express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended : false}));
app.use(express.json({extended : false}));
app.use('/api',function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    next();
});
app.use("/api", routes);

const server = app.listen(app.get('port'), function() {
    console.log(`Server is listening on port: ${server.address().port}`);
});

