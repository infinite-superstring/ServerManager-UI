<template>
  <div class="form-time">
    <span>执行命令(shell)</span>
    <div ref="aceRef" class="ace"></div>
  </div>
</template>

<script setup>
import ace from 'ace-builds'
import {onMounted, ref, watch} from "vue";
import 'ace-builds/src-noconflict/mode-sh'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/theme-chrome'
import 'ace-builds/src-min-noconflict/ext-language_tools'
import message from "@/scripts/utils/message";
// import 'ace-builds/src-noconflict/mode-json'
// import 'ace-builds/src-noconflict/mode-text'


let aceEdit = null
const aceRef = ref()
const shell = defineModel()
const props = defineProps({
  lang: {
    type: String,
    default: 'sh'
  },
  theme: {
    type: String,
    default: 'chrome'
  }
})

onMounted(async () => {
  ace.config.set('basePath', '/node_modules/ace-builds/src-noconflict');
  const options = { // 编辑器设置
    theme: `ace/theme/${props.theme}`, // 主题
    // mode: `ace/mode/${props.lang}`, // 代码匹配模式
    enableSnippets: true, // 启用代码段
    showLineNumbers: true, // 显示行号
    enableLiveAutocompletion: true, // 启用实时自动完成功能 （比如：智能代码提示）
    enableBasicAutocompletion: true, // 启用基本自动完成功能
    scrollPastEnd: true, // 滚动位置
    highlightActiveLine: true, // 高亮当前行
  }
  aceEdit = ace.edit(aceRef.value, options)
  aceEdit.getSession().setMode('ace/mode/sh');
  // 监听
  aceEdit.session.on('change', () => {
    if (!aceEdit.getValue().length >= 8192) {
      message.showWarning(this, '命令长度不能超过8192')
    }
    shell.value = aceEdit.getValue()
  })
});

watch(() => shell.value, v => {

})
</script>


<style scoped>
.form-time {
  width: 100%;
}

.ace {
  width: 100%;
  height: 100%;
}
</style>
