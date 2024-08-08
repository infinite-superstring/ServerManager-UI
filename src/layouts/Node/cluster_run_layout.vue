<script>
import {Terminal} from "@xterm/xterm";
import Result_list from "@/components/cluster/cluster_run/result_list.vue";
import Result_show from "@/components/cluster/cluster_run/result_show.vue";
import Create_shell_task from "@/components/cluster/cluster_run/create_shell_task.vue";
import {getListApi} from "@/scripts/apis/cluster_run";
import router from "@/router";


let terminal
export default {
  name: "cluster_run_layout",
  components: {Create_shell_task, Result_show, Result_list},
  data() {
    return {
      currentIsList: true,
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
    this.getList()
    router.push({query: {}})
  },
  methods: {
    getList() {
      getListApi({page: this.currentPage, pageSize: 20}).then(r => {
        this.result_list = r.data.data.PageContent
      })
    },
    selectResult(uuid) {
      console.log(uuid)
      // 设置路由参数为 uuid = uuid
      router.push({query: {uuid}})
      this.currentIsList = false
    },
    returnList() {
      this.currentIsList = true
      router.push({query: {}})
      this.getList()
    }
  },
  watch: {
    "$route.query.uuid"(newValue, oldValue) {
      this.currentIsList = !newValue;
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" sm="4">
      <create_shell_task
        @update="getList"
      />
    </v-col>
    <v-col cols="12" sm="8">
      <result_list
        v-if="currentIsList"
        v-model:current-page="currentPage"
        :max-page="maxPage"
        :data="result_list"
        @into=""
        @selectResult="selectResult"
      />
      <result_show
        v-else
        @return="returnList"
      />
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
