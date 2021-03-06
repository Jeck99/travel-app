const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profileSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    country: String,
    birthDate: {
        type: Date,
        default: Date.now
    },
})
module.exports = mongoose.model('profile', profileSchema);