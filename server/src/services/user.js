const User = require('../models/user')

const register = function(obj) {
    return new Promise((resolve, reject) => {
        const user = new User(obj)
        user.save((err, res) => {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

module.exports = {
    register
}