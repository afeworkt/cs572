const promise1=new Promise((resolve,reject)=>{
    let num=Math.random()-0.5;
    setTimeout(()=>{
        if(num>0.5){
            resolve(num);
        }else{
            reject("Promise1 Falied");
        }
    },1000);
});
const promise2=new Promise((resolve,reject)=>{
    let num=Math.random()-0.5;
    setTimeout(()=>{
        if(num>0.5){
            resolve(num);
        }else{
            reject("Promise2 failed.");
        }
    },1000);
});
const promise3=new Promise((resolve,reject)=>{
    let num=Math.random()-0.5;
    setTimeout(()=>{
        if(num>0.5){
            resolve(num);
        }else{
            reject("Promise 3 Failed");
        }
    },1000);
});

// promise1.then((value)=>{
//     console.log("Promise1 Done with value: ",value);
// }).catch(
//     (error)=>{
//         console.log("Promise1 Failed with error: ",error);
//     }
// );
// promise2.then((value)=>{
//     console.log("Promise1 Done with value: ",value);
// }).catch(
//     (error)=>{
//         console.log("Promise1 Failed with error: ",error);
//     }
// );
// promise3.then((value)=>{
//     console.log("Promise1 Done with value: ",value);
// }).catch(
//     (error)=>{
//         console.log("Promise1 Failed with error: ",error);
//     }
// );

// Promise.all([promise1,promise2,promise3]).then((value)=>{
//     console.log("All passed",value);
// }).catch((error)=>{
//     console.log("All error",error);
// });

Promise.race([promise1,promise2,promise3]).then((value)=>{
    console.log("Race passed",value);
}).catch((error)=>{
    console.log("Race error",error);
});