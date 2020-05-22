const mongoose = require('mongoose');
const Schema = mongoose.Schema;

module.exports = mongoose.model('userSchema', new Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    otp: {
        type: string,
        minlength: 6,
        maxlength: 6
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}), 'users')