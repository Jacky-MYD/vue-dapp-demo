const path = require('path')
const Koa = require('koa2')
const bodyparser = require('koa-bodyparser')
var cors = require('koa2-cors');
const static = require('koa-static')
const views = require('koa-views')
const db = require('./db/db')
const { port, dbUrl } = require('../config')
const viewsEx = require('./views/index')
const router = require('./routers/index')

// 创建koa实例
const app = new Koa()

// 配置跨域
app.use(cors())

// 配置数据解析中间件
app.use(bodyparser())

// 配置静态资源加载中间件
app.use(static(path.join(__dirname, '../public')))

// 配置模板引擎中间件
app.use(views(path.join(__dirname, './views'), viewsEx))

// 配置路由中间件
app.use(router.routes()).use(router.allowedMethods())

// 连接数据库
db.connect(dbUrl, {useNewUrlParser: true})

app.listen(port, () => {
    console.log("\033[32m Listening at http://localhost:8081 \033[0m")
})

