const { dbUrl } = require('../../config')
const mongoose = require('mongoose')

/**
 * 连接成功
 */
mongoose.connection.on('connected', () => {
    console.log("\033[32m Mongoose connection open to " +  dbUrl + "\033[0m")
})

/**
 * 连接出错
 */
mongoose.connection.on('error', err => {
    console.log("\033[31m Mongoose connection error:" + err + "\033[0m")
})

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', () => {
    console.log("\033[33m Mongoose connection disconnected \033[0m")
})

module.exports = mongoose