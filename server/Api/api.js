const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const Router = require('koa-router');
const staticServer = require('koa-static');

const apiserver = (router) => {
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
}

export default apiserver;
