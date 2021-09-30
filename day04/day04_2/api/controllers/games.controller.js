
const dbConnection = require("../data/dbconnection");

module.exports.gamesGetAll = function (req, res) {
    console.log("GET the games"); 
    const maxAllowedCount = 9, defaultCount = 6;

    let count = defaultCount;

    if (req.query && req.query.count) {
        count = parseInt(req.query.count) > maxAllowedCount ? maxAllowedCount : parseInt(req.query.count);
    }
    console.log(count);

    let db = dbConnection.get();
    let gamesCollection = db.collection("games");

    gamesCollection.find().limit(count).toArray(function(err, docs) {
        console.log("Found games");
        res.status(200).json(docs);
    });
}