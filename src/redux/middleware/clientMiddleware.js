import { push } from 'connected-react-router';

export default function clientMiddleware(client) {
  return ({ dispatch, getState }) =>
    next => (action) => {
      if (typeof action === 'function') {
        return action(dispatch, getState);
      }
      const { promise, types, ...rest } = action; // eslint-disable-line no-redeclare
      if (!promise) {
        return next(action);
      }
      const [REQUEST, SUCCESS, FAILURE, PARAMS_ERROR] = types;
      let PARAMS_ERROR_TYPE = '';
      if (PARAMS_ERROR === undefined) {
        PARAMS_ERROR_TYPE = FAILURE;
      } else {
        PARAMS_ERROR_TYPE = PARAMS_ERROR;
      }
      next({ ...rest, type: REQUEST });
      const actionPromise = promise(client);
      actionPromise
        .then(
          (result) => {
            next({ ...rest, statusCode: 200, result, type: SUCCESS });
          },
          (res) => {
            const error = res.body;
            const { statusCode } = res;
            switch (statusCode) {
              case 400:
                next({ ...rest, error, statusCode, type: PARAMS_ERROR_TYPE });
                break;
              case 401:
                break;
              case 403:
                break;
              case 500:
                next({ ...rest, error, statusCode, type: FAILURE });
                break;
              case 501:
                next({ ...rest, result: error.response, statusCode, type: SUCCESS });
                break;
              default:
                next({ ...rest, res, statusCode, type: FAILURE });
                break;
            }
          }
        );
      return actionPromise;
    };
}
