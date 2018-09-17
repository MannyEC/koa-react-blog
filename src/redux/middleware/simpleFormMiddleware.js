import ActionTypes from '../modules/SimpleForm/constants';
/**
 * Simple Form middleware.
 *
 * Catch the simple form server validate error action,
 * then send it to form change action.
 */
export default () => next => (action) => {
  if (action.simpleForm) {
    switch (action.statusCode) {
      case 200:
      case 201: {
        next({
          type: ActionTypes.SIMPLE_FORM_FIELDS_ERROR_CLEAR,
          payload: {
            form: action.simpleForm,
            errors: {}
          }
        });
        if (action.fillUpSimpleFormWhenSuccess) {
          next({
            type: ActionTypes.SIMPLE_FORM_DATA_INITIAL,
            payload: {
              data: action.result,
              form: action.simpleForm
            }
          });
        }
        break;
      }
      case 400: {
        next({
          type: ActionTypes.SIMPLE_FORM_FIELDS_ERROR,
          payload: {
            errors: action.error,
            form: action.simpleForm
          }
        });
        break;
      }
      default:
        return next(action);
    }
  }
  return next(action);
};
