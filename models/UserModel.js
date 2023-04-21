const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    first_name : {
        type: String,
        required: true,
    },
    last_name : {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        lowercase: true
    },
    password : {
        type: String,
        required: true,
    },
    isRegistrar : {
        type: Boolean,
        required: true
    },
    isReconciler : {
        type: Boolean,
        required: true
    },
    isAdmin : {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

const User = mongoose.model('user', UserSchema)

module.exports = User