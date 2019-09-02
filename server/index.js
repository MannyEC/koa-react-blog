require("@babel/register");
require('@babel/polyfill');

const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const staticServer = require('koa-static');
const index = require('./routes/index');
const apiserver = require('./Api/api').default;

const port = process.env.PORT || 80;

const app = new Koa();
const router = new Router();

apiserver(router)

app
  .use(index.routes(), index.allowedMethods())
  .use(router.routes())
  .use(router.allowedMethods());

app.use(staticServer('./site'));
app.use(staticServer('./src/static'));

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(port);
console.log(`api server is listening on ${port}`);
