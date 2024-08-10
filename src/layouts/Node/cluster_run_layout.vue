<script>
import {Terminal} from "@xterm/xterm";
import Result_list from "@/components/cluster/cluster_run/result_list.vue";
import Result_show from "@/components/cluster/cluster_run/result_show.vue";
import Create_shell_task from "@/components/cluster/cluster_run/create_shell_task.vue";
import {createApi, getCommandInfoApi, getListApi} from "@/scripts/apis/cluster_run";
import router from "@/router";
import message from "@/scripts/utils/message";


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
      params: {
        group: '',
        base_path: '',
        shell: ''
      }
    }
  },
  mounted() {
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
      getCommandInfoApi(uuid).then(r => {
        this.$refs.createShellTaskRef.setData(
          {
            group: r.data.data.group,
            base_path: r.data.data.basePath,
            shell: r.data.data.shell
          }
        )
      })
      router.push({query: {uuid}})
      this.currentIsList = false
    },
    returnList() {
      this.currentIsList = true
      router.push({query: {}})
      this.getList()
      this.$refs.createShellTaskRef.reset()
    },
    onSubmit(data) {
      console.log(data)
      createApi(data).then(() => {
        this.getList()
        this.$refs.createShellTaskRef.reset()
        message.showSuccess(this, "集群命令已下发成功")
      })
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
        ref="createShellTaskRef"
        @on-submit="onSubmit"
        :disabledSubmit="!currentIsList"
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
