let f = function(n){
    if(n < 2) {
        return n;
    }
    else {
        return f(n-1) + f(n - 2);
    }
}
const fibonacci = function(n){
    if(n<0){
        n=n*-1;
    }
    return f(n-1) + f(n-2);
}

const fib30=fibonacci(30);
console.log("fibionacci of 30", fib30);

const fibNegative15=fibonacci(-15);
console.log("fibionacci of -15", fibNegative15);

