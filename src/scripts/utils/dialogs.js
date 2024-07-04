import Vue from "@/main";
import {createApp} from 'vue';
import vuetify from '@/plugins/vuetify';
import inputOTP from "@/components/dialogs/inputDialog.vue"
import checkOTP from "@/components/dialogs/OTP/check_OTP.vue"


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
  return init_Dialog(checkOTP)
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
  showBindOTP_Dialog
}
