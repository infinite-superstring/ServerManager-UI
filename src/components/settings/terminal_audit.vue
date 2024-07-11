<script>
export default {
  name: "terminal_audit",
  props: {
    setting_data: {
      type: Object,
      required: true
    }
  }
}
</script>

<template>
  <p class="text-h5 setting_subtitle">终端/命令审计设置</p>
  <v-switch
    v-model="setting_data.terminal_audit.enable"
    label="启用终端审计"
    hint="启用终端命令审计"
    color="primary"
    density="compact"
    persistent-hint
  ></v-switch>
<!--  <v-switch-->
<!--    v-model="setting_data.terminal_audit.disable_tab_key"-->
<!--    label="禁用终端Tab键"-->
<!--    hint="当前终端审计暂不支持Tab键审计，如开启可能会出现审计错误的问题"-->
<!--    color="primary"-->
<!--    density="compact"-->
<!--    persistent-hint-->
<!--  ></v-switch>-->
  <v-textarea
    v-model="setting_data.terminal_audit.warn_command_list"
    label="警告命令列表（一行一个，可使用正则表达式）"
    hint="当用户输入该命令列表内的命令时，终端会发出警告"
    maxlength="4000"
    counter="4000"
    clearable
    persistent-hint
  ></v-textarea>
  <v-textarea
    v-model="setting_data.terminal_audit.danger_command_list"
    label="高危命令列表（一行一个，可使用正则表达式）"
    hint="当用户输入该命令列表内的命令时，系统会进行拦截"
    maxlength="4000"
    counter="4000"
    clearable
    persistent-hint
  ></v-textarea>
  <v-textarea
    v-model="setting_data.terminal_audit.disable_command_list"
    label="禁止命令列表（一行一个，可使用正则表达式）"
    hint="当用户输入该命令列表内的命令时，系统会禁用该账户（超管账户不受影响）"
    maxlength="4000"
    counter="4000"
    clearable
    persistent-hint
  ></v-textarea>
</template>

<style scoped>
.v-textarea:not(:last-child) {
  margin-bottom: 15px;
}
</style>
