import Vue from "@/main";
import {createApp} from 'vue';
import vuetify from '@/plugins/vuetify';
import inputOTP from "@/components/dialogs/inputDialog.vue"
import checkOTP from "@/components/dialogs/checkOTP.vue"


function test() {
  const ConfirmConstructor = Vue.extend(inputOTP)
  const instance = new ConfirmConstructor().$mount()
  document.body.appendChild(instance.$el)

  Vue.prototype.$showInputBox = options => {
    Object.assign(instance, options)
    instance.init()
  }
}

function showOTP_Dialog() {
  return new Promise((resolve, reject) => {
    let mountNode = document.createElement("div");
    let dialogApp = createApp(checkOTP, {
      // visible: true,
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
    }).use(vuetify);
    document.body.appendChild(mountNode);
    dialogApp.mount(mountNode);
  });
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
  showOTP_Dialog
}
