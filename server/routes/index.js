const { render } = require('../renders');
const router = require('koa-router')();

router.get('/main/*', render);

module.exports = router;
