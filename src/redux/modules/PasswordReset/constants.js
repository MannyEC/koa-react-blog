import keyMirror from 'keymirror';

export default keyMirror({
  PASSWORD_RESET_LOAD: null,
  PASSWORD_RESET_SUCCESS: null,
  PASSWORD_RESET_FAILED: null,
  PASSWORD_RESET_PARAMS_ERROR: null,
});

export const PASSWORD_RESET_API_PATH = '/resetforgetpassword/';
export const PASSWORD_RESET_SIMPLE_FORM = 'passwordresetform';
