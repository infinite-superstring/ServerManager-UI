import message from "@/scripts/utils/message";

const copyToken = (token) => {
  navigator.clipboard.writeText(token)
  message.showSuccess(this, '复制成功')
}

export default {
  copyToken
}
