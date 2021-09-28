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

module.exports=fibonacci;

