import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];
const apiPrefix = '/api/v1';

function formatUrl(path) {
  let adjustedPath = '';
  if (/^\/static\/*/.test(path)) {
    adjustedPath = path;
  } else {
    adjustedPath = path[0] !== '/' ? `${apiPrefix}/${path}` : apiPrefix + path;
  }
  return adjustedPath;
}

function nodeUrl(path) {
  return `http://localhost:8910/api/v1${path}`;
}

class _ApiClient {
  constructor(req) {
    const isWindow = typeof global.window === 'object' ? true : false;
    const urlHandler = isWindow ? formatUrl : nodeUrl;

    methods.forEach((method) => {
      this[method] = (path, {
        params, data, headers, resType
      } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](urlHandler(path));
        request.set('Accept', 'application/json');
        if (resType) {
          request.responseType(resType);
        }
        if (params) {
          request.query(params);
        }

        if (headers) {
          request.set(headers);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res) => {
          if (err) {
            reject(res || err);
          } else if (res.body) {
            resolve(res.body);
          } else {
            resolve(res.xhr);
          }
        });
      });
    });
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
