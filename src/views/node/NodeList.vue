<script>
import Node_list_layout from "@/layouts/Node/node_list_layout.vue";
import outUtil from "@/scripts/utils/outUtil";

export default {
  name: "MachineList",
  computed: {
    outUtil() {
      return outUtil
    }
  },
  components: {Node_list_layout},
  data() {
    return {
      show_msg: {
        flag: false,
        msg: null
      },
      nodeToken: null,
      serverToken: null
    }
  },
  unmounted() {
    this.show_msg.flag = true
    this.show_msg.msg = null
  },
  methods: {
    show_token(type, token) {
      switch (type) {
        case "new_node":
          this.show_msg.msg = `节点添加成功！`
          this.nodeToken = token.token
          this.serverToken = token.serverToken
          this.show_msg.flag = true
          console.log(this.nodeToken, this.serverToken)
          break
        case "reset_token":
          this.show_msg.msg = `节点Token重置成功！`
          this.nodeToken = token.token
          this.serverToken = token.serverToken
          this.show_msg.flag = true
          break
      }
    }
  }
}
</script>

<template>
  <v-card title="节点列表" class="pageMain-card">
    <v-alert
      variant="tonal"
      v-if="show_msg.flag"
      type="success"
      closable
    >
      <template #default>
        <span>
          {{ show_msg.msg }}
          <span>点击复制Token</span>
          <span
            @click="outUtil.copyToken(nodeToken)"
            class="cursor-pointer text-decoration-underline"
            v-if="nodeToken">
            节点Token
<!--          <v-icon size="16" color="primary">mdi-text-box-multiple</v-icon>-->
          </span>
          ,
          <span
            @click="outUtil.copyToken(serverToken)"
            class="cursor-pointer text-decoration-underline"
            v-if="serverToken">
            服务器Token
<!--            <v-icon size="16" color="primary">mdi-text-box-multiple</v-icon>-->
          </span>
        </span>
      </template>
    </v-alert>
    <v-card-text>
      <node_list_layout @show_token="show_token"/>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
