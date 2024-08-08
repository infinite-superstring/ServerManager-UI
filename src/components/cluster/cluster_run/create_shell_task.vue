<script>
import message from "@/scripts/utils/message";
import axios from "@/scripts/utils/axios";
import ClusterCommand from "@/components/cluster/form/ClusterCommand.vue";
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";
import {createApi} from "@/scripts/apis/cluster_run";

export default {
  name: "create_shell_task",
  components: {SelectNodeGroup, ClusterCommand},
  data() {
    return {
      group: null,
      base_path: "",
      shell: ""
    }
  },
  emits: ['update'],
  methods: {
    submit() {
      if (!this.group) return message.showError(this, "未选择运行组")
      if (this.shell.length < 1) return message.showError(this, "未编写要运行的Shell")
      console.log(this.group)
      createApi({
        node_group: this.group,
        base_path: this.base_path,
        shell: this.shell,
      }).then(() => {
        this.$refs.group_selectRef.reset()
        this.base_path = null
        this.$refs.shell_inputRef.clearShell()
        message.showSuccess(this, "集群命令已下发成功")
        this.$emit("update")
      })
    }
  }
}
</script>

<template>
  <v-card title="运行器">
    <v-card-text>
      <v-row>
        <v-col cols="12" md="6">
          <select-node-group ref="group_selectRef" label="执行组" @update="value => group = value"/>
        </v-col>
        <v-col cols="12" md="6">
          <v-text-field label="执行目录" max-length="512"></v-text-field>
        </v-col>
      </v-row>
      <cluster-command ref="shell_inputRef" class="shell_input" v-model="shell"/>
    </v-card-text>
    <v-card-actions>
      <v-btn @click="submit">执行</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.shell_input {
  max-height: 450px;
  min-height: 300px;
  height: 70vh
}
</style>
