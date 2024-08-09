import axios from "@/scripts/utils/axios";

function checkOTP_Code(code) {
  return axios.get('/api/initUser/checkOTP_Code', {
    params: {
      code: code
    }
  })
}

export default {
  checkOTP_Code
}
