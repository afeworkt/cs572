 require('dotenv').config({path:'.env'});
 require('./api/data/db');
 const express = require('express');
 const path = require('path');
 const routes =require('./api/routes');
 const app = express();
 const port=process.env.PORT;
 app.set('port',port);
 app.use(express.json({extended:false}));
 app.use(express.urlencoded({extended:false}));

 app.use("/node_modules",express.static(path.join(__dirname,'node_modules')));
 app.use(express.static(path.join(__dirname,'public')));
 app.use(function(req,res,next){

       next();
 });
 app.use("/api", routes);

 const server = app.listen(app.get('port'),function(){
        console.log('App listening on port: '+ server.address().port);
 });

 