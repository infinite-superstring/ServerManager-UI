import {useToast} from 'vue-toastification'

const toast = useToast()

const config = {
  position: "top-right",
  timeout: 3009,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: true,
  closeButton: "button",
  icon: true,
  rtl: false
}

const warning = (message) => {
  toast.warning(message, {...config})
}
const info = (message) => {
  toast.info(message, {...config})
}
const error = (message) => {
  let newConfig = {...config}
  newConfig.timeout = false
  toast.error(message, newConfig)
}

export default {
  info,
  warning,
  error
}
