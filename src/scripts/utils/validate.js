function validateEmail(email) {
  /**
   * 验证电子邮件
   * @param email 电子邮箱格式
   * @type {RegExp}
   */
  const pattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  return pattern.test(email);
}

export default {
  validateEmail,
}
