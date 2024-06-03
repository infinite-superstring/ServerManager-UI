import Vue from "@/main";


function confirm(title, text, level="info", buttons = null, cardOptions=null, dialogOptions=null) {
  return Vue.config.globalProperties.$dialog.create({
    title: title,
    text: text,
    level: level,
    buttons: buttons ? buttons :  [
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
  confirm
}
