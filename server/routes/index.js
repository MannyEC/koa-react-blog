const { render } = require('../renders');
const router = require('koa-router')();

router.redirect('/', '/main/articleList');
router.get('/main/*', render);

module.exports = router;
