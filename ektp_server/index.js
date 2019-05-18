require("@babel/register");
require('@babel/polyfill');

const Koa = require('koa');
const fs = require('fs');
const path = require('path');
var Router = require('koa-router');
const staticServer = require('koa-static');

var filePath = path.resolve('./src/posts');
var router = new Router();
const index = require('./routes/index');

// get post list
router.get('/api/v1/posts', async (ctx, next) => {
  let files = [];
  await new Promise((resolve, reject) => {
    fs.readFile(`${filePath}/index.json`, function(err, data) {
      if (err) ctx.throw(err);
      const jsonData = JSON.parse(data.toString());
      jsonData.forEach((item) => {
        files.push(item);
      });
      resolve();
    });
  });

  ctx.body = files;
});

// get post content
router.get('/api/v1/post/:id', async (ctx, next) => {
  const { id } = ctx.params;
  let ret = null;
  await new Promise((resolve, reject) => {
    fs.readFile(`${filePath}/${id}`, function(err, data) {
      if (err) ctx.throw(err);
      ret = data.toString();
      resolve();
    });
  });

  ctx.body = ret;
});
const app = new Koa();
app.use(index.routes(), index.allowedMethods());

app
  .use(router.routes())
  .use(router.allowedMethods());

app.use(staticServer('./ektp_site'));
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx);
});

app.listen(8910);
console.log(`api server is listening on ${8910}`);
