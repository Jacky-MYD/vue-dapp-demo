const Store = require('../models/store')

const insert = function(obj) {
    return new Promise((resolve, reject) => {
        const store = new Store(obj)
        store.save((err, res) => {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

const find = function(options) {
    return new Promise((resolve, reject) => {
        Store.find(options ,(err, res) => {
            if (err)
                reject(err)
            else
                resolve(res)
        })
    })
}

module.exports = {
    insert,
    find
}