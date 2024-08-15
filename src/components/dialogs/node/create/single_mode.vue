<script>
import InputTag from "@/components/input/inputTag.vue";
import message from "@/scripts/utils/message";
import validate from "@/scripts/utils/validate";
import node_manager from "@/scripts/apis/node_manager";
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";
import SelectAuthRestrictionsMethod from "@/components/input/selectAuthRestrictionsMethod.vue";

export default {
  name: "add_node__single_mode",
  components: {SelectAuthRestrictionsMethod, SelectNodeGroup, InputTag},
  emits: ['success'],
  data() {
    return {
      nodeName: null,
      description: null,
      tags: [],
      group: null,
      auth_restrictions: {
        enable: false,
        method: 1,
        value: null
      }
    }
  },
  methods: {
    submit() {
      if (!this.nodeName) {
        return message.showWarning(this, "节点名未填写")
      }
      if (this.auth_restrictions.enable) {
        const auth_restrictions = this.auth_restrictions
        if (!auth_restrictions.method) return message.showWarning(this, "节点认证限制方法未填写")
        if (!auth_restrictions.value) return message.showWarning(this, "节点认证限制值未填写")
        console.log(auth_restrictions.value)
        switch (auth_restrictions.method) {
          case 1:
            if (!validate.validateSubnetMask(auth_restrictions.value)) return message.showWarning(this, "节点认证限制-IP地址段校验失败")
            break
          case 2:
            console.log(validate.validateIpAddress(auth_restrictions.value))
            if (!validate.validateIpAddress(auth_restrictions.value)) return message.showWarning(this, "节点认证限制-IP地址校验失败")
            break
          case 3:
            if (!validate.validate_MAC(auth_restrictions.value)) return message.showWarning(this, "节点认证限制-MAC地址校验失败")
            break
          default:
            return message.showError(this, "校验失败")
        }
      }
      node_manager.add_node(
        this.nodeName,
        this.description,
        this.tags,
        this.group,
        this.auth_restrictions
      ).then(res => {
        this.$emit('success', {
          token: res.data.data.token,
          serverToken: res.data.data.server_token
        })
      })
    }
  },
  computed: {
    auth_restrictions_method_msg() {
      switch (this.auth_restrictions.method) {
        case 1:
          return "允许的IP地址段（如：192.168.1.0/24）"
        case 2:
          return "允许的IP地址（如192.168.1.1）"
        case 3:
          return "允许的MAC地址"
      }
      return ""
    }
  }
}
</script>

<template>
  <v-text-field
    type="text"
    label="节点名" v-model="nodeName"
  />
  <input-tag
    label="节点标签"
    @update="value => tags = value"
  />
  <select-node-group @update="value => group = value" add_group/>
  <v-textarea v-model="description" label="节点备注信息"></v-textarea>
  <v-divider/>
  <p>登录安全设置</p>
  <v-switch
    label="启用节点登录限制"
    v-model="auth_restrictions.enable"
    color="primary"
    hide-details
  />
  <div v-if="auth_restrictions.enable">
    <select-auth-restrictions-method :value="auth_restrictions.method" @update="args => auth_restrictions.method = args"/>
    <v-text-field v-model="auth_restrictions.value" :label="auth_restrictions_method_msg"/>
  </div>
</template>

<style scoped>

</style>
