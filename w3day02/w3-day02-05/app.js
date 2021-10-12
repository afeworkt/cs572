const fs = require('fs');
const path = require('path');
const http = require('http');
const url = require('url');

const server =http.createServer(function (req, res) {
    const queryObject = url.parse(req.url, true);
    if (queryObject && queryObject.pathname === '/index.html') {
        if (queryObject.query && queryObject.query.page) {
            let file = '';
            if (queryObject.query.page === '1') {
                file = path.join(__dirname, "public", 'page1.html');
            } if (queryObject.query.page === '2') {
                file = path.join(__dirname, "public", 'page2.html');
            } else if (queryObject.query.page === '3') {
                file = path.join(__dirname, "public", 'page3.html');
            }
            fs.readFile(file, function (err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end(`<h1>Page not found!</h1>`);
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        } else {
            res.writeHead(404);
            res.end(`<h1>Page not found!</h1>`);
            return;
        }
    } else {
        res.writeHead(404);
        res.end(`<h1>Page not found!</h1>`);
        return;
    }
});

server.listen(3000,function(){
    console.log("Server is listening on port: "+server.address().port);
});