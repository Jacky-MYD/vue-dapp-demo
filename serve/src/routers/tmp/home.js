const router = require('koa-router')()


router.get('/', async ctx => await ctx.render('home', {
    title: 'Hello Jacky!'
}))

module.exports = router