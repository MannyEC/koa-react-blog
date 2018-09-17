import { isNumber } from 'lodash';

export function unhumansize(str) {
  if (isFinite(str)) {
    return parseInt(str, 10);
  }
  if (typeof (str) !== 'string') {
    return str;
  }
  if (str.match(/\d+(\.\d+)?[KMGTkmgt]$/)) {
    const unitVal = {
      k: 1000,
      m: Math.pow(1000, 2),
      g: Math.pow(1000, 3),
      t: Math.pow(1000, 4),
      p: Math.pow(1000, 5)
    };
    const unit = str.match(/[KMGTkmgt]$/)[0].toLowerCase();
    const result = parseFloat(str) * unitVal[unit];
    return parseInt(result, 10);
  }
  return str;
}

export function humansize(num) {
  const kUnit = 1000;
  const mUnit = Math.pow(1000, 2);
  const gUnit = Math.pow(1000, 3);
  const tUnit = Math.pow(1000, 4);
  const pUnit = Math.pow(1000, 5);

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

export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

function rgbToHex(r, g, b) {
  const hex = ((r<<16) | (g<<8) | b).toString(16);
  return `#${new Array(Math.abs(hex.length - 7)).join('0')}${hex}`;
}

function hexToRgb(hex) {
  const rgb = [];
  for (let i = 1; i < 7; i += 2) {
    rgb.push(parseInt(`0x${hex.slice(i, i + 2)}`, 16));
  }
  return rgb;
}

export function gradientColor(startColor, endColor, step) {
  const sColor = hexToRgb(startColor);
  const eColor = hexToRgb(endColor);

  const rStep = (eColor[0] - sColor[0]) / step;
  const gStep = (eColor[1] - sColor[1]) / step;
  const bStep = (eColor[2] - sColor[2]) / step;

  const gradientColorArr = [];
  for (let i = 0; i < step; i++) {
    gradientColorArr.push(rgbToHex(
      parseInt(rStep * i + sColor[0], 10),
      parseInt(gStep * i + sColor[1], 10),
      parseInt(bStep * i + sColor[2], 10)
    ));
  }
  return gradientColorArr;
}
