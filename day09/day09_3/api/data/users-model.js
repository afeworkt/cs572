const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique:true
    }, 
    password: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },});
mongoose.model("User", userSchema, 'users');