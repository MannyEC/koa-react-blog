const { render } = require('../renders');
const router = require('koa-router')();

router.get('*', render);

module.exports = router;
