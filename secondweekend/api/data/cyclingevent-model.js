const mongoose = require('mongoose');
const disciplinesSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description:{
        type: String
    }
});
const cyclingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    country:{
        type: String,
        required: true
    },

    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    disciplines: [disciplinesSchema]
});

mongoose.model('Cycling', cyclingSchema, 'cyclingevents');