require("dotenv").config({"path":".env"});
const express = require('express');

const path = require('path');
require('./api/data/db')
const routes=require('./api/routes')
console.log("PORT from env is",process.env.PORT);
const app = express();

app.set('port',process.env.PORT);

app.use(express.urlencoded({extended : false}));
app.use(express.json({extended : false}));

app.use("/api", routes);

const server = app.listen(app.get('port'), function() {
    console.log(`Server is listening on port: ${server.address().port}`);
});

