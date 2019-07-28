const db = require('../services/user')

const user = {

    /**
     * 处理注册逻辑
     * @param {context} ctx 
     */
    async register(ctx) {
        const info = ctx.request.body
        const userObj = {
            userName: info.userName,
            password: info.password,
            avatarHash: info.avatarHash
        }
        await db.register(userObj)
        ctx.body = '添加成功！'
    }
}

module.exports = user