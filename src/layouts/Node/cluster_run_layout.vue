<script>
import {Terminal} from "@xterm/xterm";
import Result_list from "@/components/cluster/cluster_run/result_list.vue";
import Result_show from "@/components/cluster/cluster_run/result_show.vue";
import Create_shell_task from "@/components/cluster/cluster_run/create_shell_task.vue";
import {getListApi} from "@/scripts/apis/cluster_run";


let terminal
export default {
  name: "cluster_run_layout",
  components: {Create_shell_task, Result_show, Result_list},
  data() {
    return {
      result_list: [],
      currentPage: 1,
      maxPage: 0,
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

    getListApi({page: this.currentPage, pageSize: 20}).then(r => {
      this.result_list = r.data.data.PageContent
    })
  },
  methods: {}
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <create_shell_task/>
    </v-col>
    <v-col cols="12" sm="8">
      <result_list
        v-model:current-page="currentPage"
        :max-page="maxPage"
        :data="result_list"
        @into=""/>
      <result_show/>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
