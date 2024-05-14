function formatBytes(bytes) {
  /**
   * 格式化字节数
   */
  if (bytes === 0) return '0 字节';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];

  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)));

  return Math.round(100 * (bytes / Math.pow(k, i))) / 100 + ' ' + sizes[i];
}

export default {
  formatBytes,
}
