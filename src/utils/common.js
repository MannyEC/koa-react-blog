import { notification } from 'antd';
import { isNumber } from 'lodash';
import ApiClient from 'helpers/ApiClient';


/* 睡眠函数，参数为毫秒，使用方式 async function(){ await sleep(1000);} */
export function sleep(time) {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}

export function unhumansize(str) {
  if (isFinite(str)) {
    return parseInt(str, 10);
  }
  if (typeof (str) !== 'string') {
    return str;
  }
  if (str.match(/^\d+(\.\d+)?[KMGTkmgt]$/)) {
    const unitVal = {
      k: 1000,
      m: 1000 ** 2,
      g: 1000 ** 3,
      t: 1000 ** 4,
      p: 1000 ** 5
    };
    const unit = str.match(/[KMGTkmgt]$/)[0].toLowerCase();
    const result = parseFloat(str) * unitVal[unit];
    if (result > Number.MAX_SAFE_INTEGER) {
      console.warn('(unhumansize)Over MAX_SAFE_INTEGER');
      return Number.MAX_SAFE_INTEGER;
    }
    return parseInt(result, 10);
  }
  return str;
}

export function humansize(num) {
  const kUnit = 1000;
  const mUnit = 1000 ** 2;
  const gUnit = 1000 ** 3;
  const tUnit = 1000 ** 4;
  const pUnit = 1000 ** 5;

  if (isNaN(num)) {
    return '';
  }

  if (!num || !isNumber(num)) {
    return num;
  }
  let result = parseInt(num, 10);
  let val = '';
  if (num >= kUnit && num < mUnit) {
    val = Math.round((num / kUnit) * 10) / 10;
    result = `${val}K`;
  } else if (num >= mUnit && num < gUnit) {
    val = Math.round((num / mUnit) * 10) / 10;
    result = `${val}M`;
  } else if (num >= gUnit && num < tUnit) {
    val = Math.round((num / gUnit) * 10) / 10;
    result = `${val}G`;
  } else if (num >= tUnit && num < pUnit) {
    val = Math.round((num / tUnit) * 10) / 10;
    result = `${val}T`;
  } else if (num >= pUnit) {
    val = Math.round((num / pUnit) * 10) / 10;
    result = `${val}P`;
  } else {
    result = Math.round(num * 10) / 10;
  }
  return result;
}

// 如果结果为空，接口返回的是[], 需要格式化
export function toObjectByResult(result) {
  let newData = {};
  if (result instanceof Array) {
    newData = {
      count: result.length,
      results: result,
      next: null,
      previous: null
    };
  } else {
    newData = result;
  }
  return newData;
}

export function isObjectValueEqual(object1, object2) {
  // Of course, we can do it use for in
  // Create arrays of property names
  const aProps = Object.getOwnPropertyNames(object1);
  const bProps = Object.getOwnPropertyNames(object2);

  // If number of properties is different,
  // objects are not equivalent
  if (aProps.length !== bProps.length) {
    return false;
  }

  for (let index = 0; index < aProps.length; index++) {
    const propName = aProps[index];

    // If values of same property are not equal,
    // objects are not equivalent
    if (object1[propName] !== object2[propName]) {
      return false;
    }
  }

  // If we made it this far, objects
  // are considered equivalent
  return true;
}

export function isObjectEmpty(object) {
  // 判断对象是否为空对象
  const objectKeys = Object.keys(object);
  return objectKeys.length === 0;
}

//  去除对象中的空值和未定义值
export function getUsefulParams(formParams) {
  const filterParams = {};
  for (const key of Object.keys(formParams)) {
    const value = formParams[key];
    if (value !== '' && value !== undefined) {
      if (typeof value === 'string') {
        if (value.trim() !== '') {
          filterParams[key] = value.trim();
        }
      } else {
        filterParams[key] = value;
      }
    }
  }
  return filterParams;
}

// 利用率的显示
export function usefulPercent(current, total) {
  const num = Math.round((current / total) * 10000) / 100;
  const percent = `${num}%`;
  return percent;
}


export function dealExportFileResponse(res, fileName) {
  let filename = fileName || '';
  const headers = res.headers;
  const disposition = headers['content-disposition'];
  if (disposition && disposition.indexOf('attachment') !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
    const matches = filenameRegex.exec(disposition);
    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, '');
    }
  }
  const blob = res.body;
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE workaround for "HTML7007:
    // One or more blob URLs were revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
  } else {
    const URL = window.URL || window.webkitURL;
    const downloadUrl = URL.createObjectURL(blob);

    if (filename) {
      // use HTML5 a[download] attribute to specify filename
      const a = document.createElement('a');
      // safari doesn't support this yet
      if (typeof a.download === 'undefined') {
        const windowObjectReference = window.open('about:blank', '_blank');
        windowObjectReference.location = downloadUrl;
        windowObjectReference.close();
      } else {
        a.href = downloadUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } else {
      window.location = downloadUrl;
    }
    setTimeout(() => { URL.revokeObjectURL(downloadUrl); }, 100); // cleanup
  }
}

export function exportFile({
  url, method, config, onSuccess, prefix, fileName
}) {
  const client = new ApiClient();
  let requestPrefix = '';
  if (prefix !== undefined) {
    requestPrefix = prefix;
  }
  const requestUrl = `${requestPrefix}${url}`;
  const requestConfig = method === 'GET' ? {
    params: config,
    resType: 'blob'
  } : {
    data: config,
    resType: 'blob'
  };
  client[method.toLowerCase()](requestUrl, requestConfig)
    .then((res) => {
      dealExportFileResponse(res, fileName);
      if (onSuccess) {
        onSuccess();
      }
    }).catch((res) => {
      const error = res.body;
      const { statusCode } = res;
      if (statusCode === 501) {
        if (error.message) {
          notification.error({
            message: error.message,
            description: ''
          });
        }
      }
    });
}
//  处理时间字符串
export function dealTimeString(dateString) {
  const strArray = [];
  const year = dateString.split('年');
  if (year) {
    const yearStr = year[0];
    strArray.push(yearStr);
    if (year[1]) {
      const month = year[1].split('月');
      if (month) {
        const monthStr = month[0];
        strArray.push(monthStr);
        if (month[1]) {
          const day = month[1].split('日');
          if (day) {
            const dayStr = day[0];
            strArray.push(dayStr);
          }
        }
      }
    }
  }
  return strArray.join('-');
}


export function extraError(key, errorsObj, getFieldError) {
  let errorContent = '';
  if (getFieldError(key, errorsObj)) {
    errorContent = getFieldError(key, errorsObj).help;
  }
  return errorContent;
}

export function scientificNotation(num) {
  if (num) {
    let strNumber = num.toString();
    let result = '';
    while (strNumber.length > 3) {
      result = ',' + strNumber.slice(-3) + result;
      strNumber = strNumber.slice(0, strNumber.length - 3);
    }
    if (strNumber) {
      return (strNumber + result);
    }
  }
  return num;
}
