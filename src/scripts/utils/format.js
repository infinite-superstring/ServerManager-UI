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
  return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
}

export default {
  formatBytes,
  formatPercentage,
  formatTimestampToStr,
}
