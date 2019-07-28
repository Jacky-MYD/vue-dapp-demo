const db = require('../services/upload')

const upload = {

    /**
     * 处理注册逻辑
     * @param {context} ctx 
     */
    async upload(ctx) {
        const info = ctx.request.body
        let results = await db.upload()
        // const productObj = {
        //     id: results.length + 1,
        //     productName: info.productName,
        //     picture: info.picture,
        //     price: info.price,
        //     amount: info.amount
        // }
        // await db.insert(productObj)
        ctx.body = results
    },

   
}

module.exports = upload