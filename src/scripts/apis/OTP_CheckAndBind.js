import axios from "@/scripts/utils/axios";

class bind {
  /**
   * 绑定OTP令牌
   */
  constructor() {
  }

  sendEmailCode() {
    /**
     * 发送邮箱验证码
     */
    return axios.get("/api/auth/OTP/sendEmailCode")
  }

  verifyEmailCode(code) {
    /**
     * 验证邮箱验证码
     */
    return axios.post("/api/auth/OTP/bind/verifyEmailCode", {
      code: code
    })
  }

  verifyOTP_Code(code) {
    /**
     * 验证OTP并绑定
     */
    return axios.post("/api/auth/OTP/bind/verifyOTP_Code", {
      code: code
    })
  }
}

class unbind {
  /**
   * 解绑OTP令牌
   */
  sendEmailCode() {
    /**
     * 发送邮箱验证码
     */
    return axios.get("/api/auth/OTP/sendEmailCode")
  }

  verifyEmailCode() {
    /**
     * 验证邮箱验证码并解除绑定
     */
  }
}

class verify {
  /**
   * 验证OTP令牌
   */
  constructor() {
  }

  checkOTP(code) {
    /**
     * 检查OTP
     */
    return axios.get('/api/auth/OTP/verify/checkOTP', {
      params: {
        code: code
      }
    })
  }
}

export default {
  bind,
  verify
}
