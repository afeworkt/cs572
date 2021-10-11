var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");
const register = function (req, res) {
    console.log("Registering  user");
    var username = req.body.username;
    var name = req.body.name || null;
    var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create({ username: username, name: name, password: password }, function (err, user) {
        if (err) { console.log(err); res.status(400).json(err); }
        else { console.log("user  created", user); res.status(200).json(user); }
    });
};
const login = function (req, res) {
    console.log("Logging  in user");
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }).exec(function (err, user) {
        if (err) { console.log(err); res.status(400).json(err); }
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                console.log("user  found", user); res.status(200).json(user);
            } else { res.status(401).json("Unauthorized"); }
        } else { console.log("user  not found", user); res.status(400).json("Unauthorized"); }
    });
}
module.exports={
 register:register,
 login:login
};