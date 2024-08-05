function validateEmail(email) {
  /**
   * 验证电子邮件
   * @param email 电子邮箱格式
   * @type {RegExp}
   */
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email);
}

function validateIpAddress(ip_address) {
  /**
   * 验证IP地址
   * @type {RegExp}
   */
  const pattern = /^((?:(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9]))$|^((?:[A-Fa-f0-9]{1,4}:){7}[A-Fa-f0-9]{1,4}|((?:[A-Fa-f0-9]{1,4}:){1,7}|:)|((?:[A-Fa-f0-9]{1,4}:){1,6}:|:(:[A-Fa-f0-9]{1,4}){1,6})|((?:[A-Fa-f0-9]{1,4}:){1,5}(:[A-Fa-f0-9]{1,4}){1,2})|((?:[A-Fa-f0-9]{1,4}:){1,4}(:[A-Fa-f0-9]{1,4}){1,3})|((?:[A-Fa-f0-9]{1,4}:){1,3}(:[A-Fa-f0-9]{1,4}){1,4})|((?:[A-Fa-f0-9]{1,4}:){1,2}(:[A-Fa-f0-9]{1,4}){1,5})|(?:[A-Fa-f0-9]{1,4}:)((:[A-Fa-f0-9]{1,4}){1,6}))$/
  return pattern.test(ip_address)
}

function validateSubnetMask(subnet_mask) {
  /**
   * 验证子网掩码
   * @type {RegExp}
   */
  const pattern = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\/(3[0-2]|[12]?[0-9])$/
  return pattern.test(subnet_mask)
}

function validate_MAC(MAC) {
  /**
   * 验证MAC地址
   * @type {RegExp}
   */
  const pattern = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/
  return pattern.test(MAC)
}

export default {
  validateEmail,
  validateIpAddress,
  validateSubnetMask,
  validate_MAC
}
