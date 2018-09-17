import keyMirror from 'keymirror';

export default keyMirror({
  LOAD_SECURITY_POLICY_SUCCESS: null,
  LOAD_SECURITY_POLICY_FAIL: null,
  LOAD_SECURITY_POLICY: null,
  UPDATE_SECURITY_POLICY_SUCCESS: null,
  UPDATE_SECURITY_POLICY_FAIL: null,
  UPDATE_SECURITY_POLICY: null,
  UPDATE_SECURITY_POLICY_PARAMS_ERROR: null
});

export const SECURITY_POLICY_API_PATH = '/security/updatesec';
export const SECURITY_POLICY_FROM = 'securityPolicyForm';
