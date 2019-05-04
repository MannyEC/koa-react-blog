import superagent from 'superagent';

const methods = ['get', 'post', 'put', 'patch', 'del'];
const apiPrefix = '/api/v1';

function formatUrl(path) {
  let adjustedPath = '';
  const ispackage = sessionStorage.getItem('package');
  if (/^\/static\/*/.test(path) || ispackage) {
    adjustedPath = path;
  } else {
    adjustedPath = path[0] !== '/' ? `${apiPrefix}/${path}` : apiPrefix + path;
  }
  return adjustedPath;
}

class _ApiClient {
  constructor(req) {
    methods.forEach(method =>
      this[method] = (path, {
        params, data, headers, resType
      } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        request.set('Accept', 'application/json');
        if (sessionStorage.userToken) {
          request.set('Authorization', `Token ${sessionStorage.userToken}`);
        }
        // update superagent, support 'blob' responseType, then we can use Apiclient download pictures or reports
        if (resType) {
          request.responseType(resType);
        }
        if (params) {
          request.query(params);
        }

        // custom header fields
        if (headers) {
          request.set(headers);
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res) => {
          if (err) {
            if (resType === 'blob') {
              const reader = new FileReader();
              reader.onloadend = () => {
                try {
                  const body = JSON.parse(reader.result);
                  const newRes = {
                    ...res,
                    body
                  };
                  reject(newRes || err);
                } catch (error) {
                  reject(err);
                }
              };
              reader.readAsText(res.body);
            } else {
              reject(res || err);
            }
          } else if (res.body) {
            if (resType && resType === 'blob') {
              resolve(res);
            } else {
              resolve(res.body);
            }
          } else {
            resolve(res.xhr);
          }
        });
      }));
  }
}

const ApiClient = _ApiClient;

export default ApiClient;
