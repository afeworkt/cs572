const express=require('express');

const app=express();
app.set("port",3000);

app.get("/:second",function(req,res){
    if(req.params && req.params.second && req.query && req.query.first){
        const first= parseFloat(req.query.first);
        const second= parseFloat(req.params.second);
        let result=first * second;
        res.status(200).json({"result":result,"first":first,"second":second});
    }else{
        res.status(400).json({"error":"Please specify parameters to make multiplication!"});
    }
});

const server = app.listen(app.get("port"),function(){
    console.log(`Server listening on port: ${server.address().port}`);
});