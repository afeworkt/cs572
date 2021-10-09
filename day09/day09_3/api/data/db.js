const mongoose=require('mongoose');
require('./games-model');
require('./users-model');

const dbUrl=process.env.DATABASE_URL+process.env.DATABASE_NAME;

mongoose.connect(dbUrl);

mongoose.connection.on("connected",function(){
    console.log(`database connection successful to ${dbUrl}`);
});

mongoose.connection.on("disconnected",function(){
    console.log(`database disconnected!`);
});
mongoose.connection.on('error', err => {
    console.log(err);
});

process.on("SIGTERM",function(){
        mongoose.connection.close(function(){
            console.log(`database connection closed manually!`);
            process.exit();
        });
});

process.on("SIGINT",function(){
    mongoose.connection.close(function(){
        console.log(`database connection closed manually!`);
        process.exit(0);
    });
});

process.on("SIGUSR2",function(){
    mongoose.connection.close(function(){
        console.log(`database connection closed manually!`);
        process.exit(0);
    });
});

