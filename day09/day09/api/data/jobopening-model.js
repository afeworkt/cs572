const mongoose = require('mongoose');

// job opening {title, salary, location, description, experience, skills, postDate}
// {date, reviewText, nameOfReviewer}.
const reviewSchema=new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now()
    },
    reviewText:{
        type:String,
        required:true
    },
    nameOfReviewer:{
        type:String,
        required:true
    }
});

const jobOpeningSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:false
    },
    location:{
        type:String,
        required:false
    },
    description:{
        type:String,
        required:false
    },
    experience:{
        type:String,
        required:false
    },
    skills:[],
    postDate:{
        type:Date,
        default:Date.now
    },
    reviews:[reviewSchema]
});

mongoose.model('JobOpening',jobOpeningSchema,'jobopenings')