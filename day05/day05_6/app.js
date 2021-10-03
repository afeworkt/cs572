
const express = require('express');
const path = require('path');
require('./api/data/db')
const routes=require('./api/routes')

const app = express();

app.set('port',3000);

app.use(express.urlencoded({extended : false}));
app.use(express.json({extended : false}));

app.use("/api", routes);

const server = app.listen(app.get('port'), function() {
    console.log(`Server is listening on port: ${server.address().port}`);
});

