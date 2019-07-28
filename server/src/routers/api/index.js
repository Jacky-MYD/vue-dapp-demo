const router = require('koa-router')()
const store = require('../../controllers/store')
const upload = require('../../controllers/upload')
const user = require('../../controllers/user')

module.exports = router.post('/insertProduct', store.insertProduct)
                       .get('/productList', store.productList)
                       .post('/upload', upload.upload)
                       .post('/register', user.register)