const isEmpty = value => value === undefined || value === null || value === '';
const join = rules => (value, data) => (
  rules.map(rule => rule(value, data)).filter(error => !!error)[0]
);

export function email(value) {
  // Let's not start a debate on email regex. This is just for an example app!
  if (!isEmpty(value) && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    return 'Invalid email address';
  }
  return false;
}

export function required(value) {
  if (isEmpty(value)) {
    return 'Required';
  }
  return false;
}

export function minLength(min) {
  return (value) => {
    if (!isEmpty(value) && value.length < min) {
      return `Must be at least ${min} characters`;
    }
    return false;
  };
}

export function maxLength(max) {
  return (value) => {
    if (!isEmpty(value) && value.length > max) {
      return `Must be no more than ${max} characters`;
    }
    return false;
  };
}

export function integer(value) {
  if (!Number.isInteger(Number(value))) {
    return 'Must be an integer';
  }
  return false;
}

export function oneOf(enumeration) {
  return (value) => {
    if (enumeration.indexOf(value) === -1) {
      return `Must be one of: ${enumeration.join(', ')}`;
    }
    return false;
  };
}

export function match(field) {
  return (value, data) => {
    if (data) {
      if (value !== data[field]) {
        return 'Do not match';
      }
    }
    return false;
  };
}

export function createValidator(rules) {
  return (data = {}) => {
    const errors = {};
    Object.keys(rules).forEach((key) => {
      // concat enables both functions and arrays of functions
      const rule = join([].concat(rules[key]));
      const error = rule(data[key], data);
      if (error) {
        errors[key] = error;
      }
    });
    return errors;
  };
}

export function validateIPRange(iprange) {
  // 192.168.100.1/24 | 0.0.0.0/0
  const re1 = /^((?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5]))\.){2}(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))(?:(?:\.(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))(\/(?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5]))))?|(\/(?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))\.(?:(?:[01]?\d?\d|2(?:[0-4]\d|5[0-5])))))$/;
  // match 127.0.0.1 | 255.255.255.0 | 192.168.0.1
  const re2 = /^(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})(\.(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[0-9]{1,2})){3}$/;
  if (iprange.match(re1)) {
    return true;
  } else if (iprange.match(/-/)) {
    const ranges = iprange.split('-');
    if (ranges.length !== 2) {
      return false;
    }
    return !!(
      ranges[0].match(re2)
      && ranges[1].match(/^(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])$/)
    );
  }
  return false;
}
