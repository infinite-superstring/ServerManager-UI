/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '../router'
import vuetifyInstance from '@/plugins/vuetify' //Or wherever you have your vuetify instance
import {Vuetify3Dialog} from 'vuetify3-dialog'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import eventBus from 'vue3-eventbus'
import Toast, {POSITION} from "vue-toastification";
import "vue-toastification/dist/index.css";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
import { createI18n } from 'vue-i18n'
import i18ns from '@/i18n/i18ns'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const toast_options = {
  position: POSITION.TOP_CENTER
};

const i18n_options = createI18n({
  legacy: false,
  messages: i18ns,
  locale: 'zh_cn'  // 设置默认语言
})


export function registerPlugins(app) {
  app
    .use(vuetify)
    .use(router)
    .use(i18n_options)
    .use(Vuetify3Dialog, {
      vuetify: vuetifyInstance, //You must pass your vuetify instance as an option
      defaults: {
        //You can pass default options for dialogs, dialog's card, snackbars or bottom-sheets here
      }
    })
    .use(pinia)
    .use(eventBus)
    .use(Toast, toast_options)
    .use(VueViewer, {
      defaultOptions: {
        zIndex: 9999, //解决图片放大的层级问题
      }
    })
}
