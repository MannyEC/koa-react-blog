import { push } from 'react-router-redux';
import { LOGOUT_SUCCESS } from 'redux/modules/auth/constants';
import { loading, loaded } from 'redux/modules/Loading/actions';
import GlobalTips from 'redux/modules/GlobalTips/constants';

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
       if (!rest.isNotLoading) {
         next(loading());
       }
       next({ ...rest, type: REQUEST });

       const actionPromise = promise(client);
       actionPromise
      .then(
        (result) => {
          if (!rest.isNotLoading) {
            next(loaded());
          }
          next({ ...rest, statusCode: 200, result, type: SUCCESS });
        },
        (res) => {
          if (!rest.isNotLoading) {
            next(loaded());
          }
          const error = res.body;
          const { statusCode } = res;
          switch (statusCode) {
            case 400:
              next({ ...rest, error, statusCode, type: PARAMS_ERROR_TYPE });
              break;
            case 401:
              // next({ ...rest, error, statusCode, type: LOGOUT_SUCCESS });
              // --------------------
              //  Go to login page
              // --------------------
              // dispatch(push('/login'));
              break;
            case 403:
              next({ ...rest, error, statusCode, type: GlobalTips.PERMISSION_DENIDE });
              break;
            case 500:
              next({ ...rest, error, statusCode, type: FAILURE });
              break;
            case 501:
              next({ ...rest, error: error.errors, statusCode, type: GlobalTips.SHOW_ERROR });
              next({ ...rest, result: error.response, statusCode, type: SUCCESS });
              break;
            default:
              next({ ...rest, res, statusCode, type: FAILURE });
              break;
          }
        }
      );
       return actionPromise;
     }
  ;
}
