const mongoose = require('mongoose');
const User = mongoose.model('User');
const bcrypt =require('bcrypt');

addUser = function (req, res) {
    const newUser = {
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password,bcrypt.genSaltSync(10)),
        name: req.body.name
    };

    User.create(newUser, function (err, data) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            res.status(201).json(data);
        }
    });
}

module.exports={
    addUser:addUser
};