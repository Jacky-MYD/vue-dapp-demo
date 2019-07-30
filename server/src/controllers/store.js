const db = require('../services/store')

const store = {

    /**
     * 处理注册逻辑
     * @param {context} ctx 
     */
    async insertProduct(ctx) {
        const info = ctx.request.body
        let results = await db.find()
        // const productObj = {
        //     id: results.length + 1,
        //     productName: info.productName,
        //     picture: info.picture,
        //     price: info.price,
        //     amount: info.amount
        // }
        // await db.insert(productObj)
        ctx.body = '添加成功！'
    },

    /**
     * 处理登录逻辑
     * @param {context} ctx
     */
    async productList(ctx) {
        const info = ctx.request.body
        let results = await db.find()
        ctx.body = results
    }
}

module.exports = store