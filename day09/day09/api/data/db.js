const mongoose = require('mongoose');
require('./jobopening-model');
const dbUrl= process.env.DATABASE_URL+ process.env.DATABASE_NAME;

mongoose.connect(dbUrl);

mongoose.connection.on('connected',function() {
    console.log('Database connected at: '+dbUrl); 
});
mongoose.connection.on('disconnected',function() {
    console.log('Database disconnected'); 
});

process.on('SIGINT',function(){
    mongoose.connection.close(function() {
        console.log('Database closed manually');
        process.exit(0);
    })
});
process.on('SIGTERM',function(){
    mongoose.connection.close(function() {
        console.log('Database closed manually');
        process.exit(0);
    })
});

process.on('SIGUSR2',function(){
    mongoose.connection.close(function() {
        console.log('Database closed manually');
        process.exit(0);
    })
});