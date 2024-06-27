/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
// 图标库
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import '@fortawesome/fontawesome-free/css/all.css'

import {aliases, mdi} from 'vuetify/iconsets/mdi'
import {md} from 'vuetify/iconsets/md'
import {fa} from 'vuetify/iconsets/fa'

import 'vuetify/styles'

// Composables
import {createVuetify} from 'vuetify'
// bata
import {VDateInput} from 'vuetify/labs/VDateInput'
import { VTimePicker } from 'vuetify/labs/VTimePicker'
// import { VStepperVertical } from 'vuetify/labs/VStepperVertical'

// i18n 您自己的翻译文件
import {zhHans, pl} from 'vuetify/locale'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  // 中文配置
  locale: {
    locale: 'zhHans',
    message: {zhHans},
  },
  components: {
    VTimePicker,
    VDateInput,
    // VStepperVertical,
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#1867C0',
          secondary: '#5CBBF6',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
      md,
      fa,
    },
  },
})
