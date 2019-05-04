import moment from 'moment-timezone';
import 'moment/locale/en-gb';
import 'moment/locale/zh-cn';

export function localUtc(args) {
  return moment.utc(args);
}

export function getTimeZoneOffset(timestamp) {
  const timezone = localStorage.sysTimezone || 'Asia/Shangehai';
  return -moment.tz(timestamp, timezone).utcOffset();
}

export default function localMoment(args) {
  const language = localStorage.language;
  switch (language) {
    case 'en':
      moment.locale('en');
      break;
    case 'ja':
    default:
      moment.locale('zh-cn');
  }
  const timezone = localStorage.sysTimezone || 'Asia/Chongqing';
  const sysTime = localStorage.sysTime || moment().format('X');

  let newMoment = moment(sysTime * 1000).tz(timezone);
  if (args) {
    newMoment = moment(args).tz(timezone);
  }
  return newMoment;
}
