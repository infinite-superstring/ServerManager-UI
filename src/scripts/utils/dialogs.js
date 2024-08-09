import Vue from "@/main";
import {createApp} from 'vue';
import vuetify from '@/plugins/vuetify';
import inputOTP from "@/components/dialogs/input/inputDialog.vue"
import checkOTP from "@/components/dialogs/OTP/check_OTP.vue"
import force_bind_OTP from "@/components/dialogs/OTP/force_bind_OTP.vue";
import inputDialog from "@/components/dialogs/input/inputDialogV2.vue"


function test() {
  const ConfirmConstructor = Vue.extend(inputOTP)
  const instance = new ConfirmConstructor().$mount()
  document.body.appendChild(instance.$el)

  Vue.prototype.$showInputBox = options => {
    Object.assign(instance, options)
    instance.init()
  }
}

async function init_Dialog(component, other_data={}) {
  return new Promise((resolve, reject) => {
    let mountNode = document.createElement("div");
    let dialogApp = createApp(component, {...{
      close: () => {
        if (dialogApp) {
          dialogApp.unmount();
          document.body.removeChild(mountNode);
          dialogApp = undefined;
          reject("close");
        }
      },
      confirm: (res) => {
        resolve(res);
        dialogApp?.unmount();
        document.body.removeChild(mountNode);
        dialogApp = undefined;
      },
    }, ...other_data}).use(vuetify);
    document.body.appendChild(mountNode);
    dialogApp.mount(mountNode);
  });
}

async function showVerifyOTP_Dialog() {
  /**
   * 展示验证OTP弹窗
   */
  return init_Dialog(checkOTP)
}

async function showBindOTP_Dialog() {
  /**
   * 展示绑定OTP弹窗
   */
  return init_Dialog(force_bind_OTP)
}

async function showInput_Dialog(title= "", label= "", hint = "",type= "text", persistent = null, value= null, max= null, min= null) {
  /**
   * 展示输入框
   * @param title 输入框模态标题
   * @param label 输入框内部标题
   * @param hint 输入框提示
   * @param type 输入框类型
   * @param value 输入框值
   * @param max 输入框最大值(仅text与number)
   * @param min 输入框最小值(仅text与number)
   */
  return init_Dialog(inputDialog, {
    title: title,
    label: label,
    hint: hint,
    type: type,
    persistent: persistent,
    default_value: value,
    max: max,
    min: min,
  })
}

function confirm(title, text, level = "info", buttons = null, cardOptions = null, dialogOptions = null) {
  return Vue.config.globalProperties.$dialog.create({
    title: title,
    text: text,
    level: level,
    buttons: buttons ? buttons : [
      {title: '确认', key: true},
      {title: '取消', key: false},
    ],
    cardOptions: cardOptions ? cardOptions : {
      //any v-card api options
    },
    dialogOptions: dialogOptions ? dialogOptions : {
      maxWidth: '400px'
    }
  })
}

export default {
  confirm,
  test,
  showVerifyOTP_Dialog,
  showBindOTP_Dialog,
  showInput_Dialog
}
