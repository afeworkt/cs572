const MongoClient = require('mongodb').MongoClient;
const dbName = "meanGames";
const dbUrl = "mongodb://localhost:27017/" + dbName;
var _connection = null;

function open() {
    if (get() === null) {
        MongoClient.connect(dbUrl, function (err, client) {
            if (err) {
                console.log("unable to connect to " + dbUrl);
                return;
            }
            _connection = client.db(dbName);

            console.log(`connection successful to ${dbUrl}`);
        });
    }
}

const get = function () {
    return _connection;
}

module.exports = {
    get: get,
    open: open
}