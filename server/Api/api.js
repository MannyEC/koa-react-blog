const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const Router = require('koa-router');
const staticServer = require('koa-static');
const filePath = path.resolve('./src/posts');

const postListFilter = (ctx, queryset) => {
  let ret = queryset;
  const fields = ['postTag', 'postType', 'page'];
  const req_query = ctx.request.query;

  if (!req_query.postType) {
    ret = queryset;
  } else {
    ret = ret.filter((post) => post.type === req_query.postType)
  }
  if (req_query.postTag) {
    ret = ret.filter((post) => {
      const tags = post.tags.toUpperCase();
      return tags.includes(req_query.postTag.toUpperCase())
    })
  }
  const count = ret.length;
  const page = parseInt(req_query.page);
  if (page) {
    const page_size = 10;
    if ((page_size * page > ret.length) &&(page_size * (page - 1) > ret.length)) return { data: [], count};
    if (page_size * page > ret.length) {
      ret = ret.slice((page - 1) * page_size)
    } else {
      console.log('he')
      ret = ret.slice((page -1) * page_size, page * page_size)
    }
  }

  return {
    data: ret,
    count,
  };
}

const apiserver = (router) => {
  // get post list
  router.get('/api/v1/posts', async (ctx, next) => {
    let files = [];
    // console.log(ctx)
    // console.log(ctx.params)
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

    ctx.body = postListFilter(ctx, files);
  });

  // get post content
  router.get('/api/v1/post/:id', async (ctx, next) => {
    const { id } = ctx.params;
    let ret;
    await new Promise((resolve, reject) => {
      const r1 = readline.createInterface({
        input: fs.createReadStream(`${filePath}/${id}`)
      });

      let isInNote = false;
      r1.on('line', function(line){ //事件监听
        if (line.slice(0, 3) === '---') {
          isInNote = !isInNote;
        }
        if (!isInNote) {
          ret = ret ? `${ret}\n${line}` : line;
        }
      })
      r1.on('close', function(){
        resolve();
      })
    });
    ctx.body = {
      data: ret
    };
  });
}

export default apiserver;
