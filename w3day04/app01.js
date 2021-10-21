const mySaveToDB=function(a,b,f){
    console.log("Saving a ..",a);
    console.log("Saving b ..",b);
    setTimeout(f(),2000);
}
const myCallBack=function(){
    console.log("Hi I'm a callback");
}

mySaveToDB("meanGames",5,myCallBack);