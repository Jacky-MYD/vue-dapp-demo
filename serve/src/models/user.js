const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: String,
    password: String,
    avatarHash: String
})

module.exports = mongoose.model('user', userSchema)
