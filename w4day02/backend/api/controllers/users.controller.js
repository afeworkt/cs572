var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");
// const register = function (req, res) {
//     console.log("Registering  user");
//     var username = req.body.username;
//     var name = req.body.name || null;
//     var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
//     User.create({ username: username, name: name, password: password }, function (err, user) {
//         if (err) { console.log(err); res.status(400).json(err); }
//         else { console.log("user  created", user); res.status(200).json(user); }
//     });
// };
const register = function (req, res) {
    console.log("Registering  user");
    bcrypt.genSalt(10)
    .then((generatedSalt) => hashPassword(generatedSalt, req))
    .then((hashPass) => createUser(hashPass, req))
    .then((user) => res.status(201).json(user))
    .catch((err) => res.status(500).json(err));
}
const createUser=function(hashedPassword, req) {

    const newUser = {
        username :req.body.username,
        password : hashedPassword,
        name :req.body.name
    };
    return User.create(newUser);
}

const hashPassword=function(generatedSalt, req) {
    return bcrypt.hash(req.body.password, generatedSalt);
}
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
module.exports = {
    register: register,
    login: login
};