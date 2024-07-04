<script>
import {Terminal} from "@xterm/xterm";
import Result_list from "@/components/cluster/cluster_run/result_list.vue";
import Result_show from "@/components/cluster/cluster_run/result_show.vue";
import Create_shell_task from "@/components/cluster/cluster_run/create_shell_task.vue";


let terminal
export default {
  name: "cluster_run_layout",
  components: {Create_shell_task, Result_show, Result_list},
    data() {
    return {
      result_list: [
        {
          result_id: 1,
          time: "2023-04-04 00:00:00",
          command: "ls -a",
        },
        {
          result_id: 2,
          time: "2023-04-04 00:00:00",
          command: "tree",
        },
        {
          result_id: 3,
          time: "2023-04-04 00:00:00",
          command: "ping 127.0.0.1",
        }
      ]
    }
  },
  mounted() {
    // terminal = new Terminal({
    //   // disableStdin: true
    //   rows: 40, //行数
    //   cols: 100, // 不指定行数，自动回车后光标从下一行开始
    //   convertEol: true, //启用时，光标将设置为下一行的开头
    // });
    // terminal.open(this.$refs.terminal)
  },
  methods: {

  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <create_shell_task/>
    </v-col>
    <v-col cols="12" sm="8">
      <result_list :data="result_list" @into=""/>
      <result_show/>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
