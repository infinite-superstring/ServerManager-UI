function formatBytes(bytes) {
  /**
   * 格式化字节数
   */
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));

  return Math.round(100 * (bytes / Math.pow(k, i))) / 100 + ' ' + sizes[i];
}

function formatPercentage(value) {
  // 保留小数点后一位
  let formattedValue = parseFloat(value).toFixed(1);
  // 将值限制在0到100之间
  formattedValue = Math.min(formattedValue, 100);
  return formattedValue;
}

/**
 * 时间戳转字符串
 * 格式为 : 0000-00-00 00:00:00
 * @return {string}
 * @param timestamp
 */
function formatTimestampToStr(timestamp) {
  let date = new Date(timestamp);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  // 年月日时分秒 少于两位 往前补 0
  month = month < 10 ? '0' + month : month;
  day = day < 10 ? '0' + day : day;
  hour = hour < 10 ? '0' + hour : hour;
  minute = minute < 10 ? '0' + minute : minute;
  second = second < 10 ? '0' + second : second;
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

/**
 * 时间字符串转秒
 * 例如 19:00:00
 * 转换为 19 * 3600 + 00 * 60 + 00 = 68400
 * @param timeStr
 * @return {number}
 */
function timeStringToSeconds(timeStr) {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = ('0' + (currentDate.getMonth() + 1)).slice(-2); // getMonth返回的月份是从0开始的
  const day = ('0' + currentDate.getDate()).slice(-2);
  const fullDateTimeStr = `${year}-${month}-${day}T${timeStr}`;
  const dateObj = new Date(fullDateTimeStr);
  const seconds = dateObj.getHours() * 3600 + dateObj.getMinutes() * 60 + dateObj.getSeconds();
  console.log(timeStr)
  return seconds;
}

export default {
  formatBytes,
  formatPercentage,
  formatTimestampToStr,
  timeStringToSeconds
}
