<template>
  <v-card>
    <v-card-title>
      <v-btn icon="mdi:mdi-arrow-left" variant="text" @click="$emit('return')"/>
      执行结果(UUID)
    </v-card-title>
    <v-card-text height="600px">
      <SelectNodeResult v-model="resultUUID" :nodes="nodes"/>
      <v-sheet width="100%">
        <CommandTerminal
          :command="currResultData.lines"
          :loading="isLoading"
        />
      </v-sheet>
      <div v-if="currResultData.tooBig" class="tooBig">
        <span><i>内容过大,仅显示最后4000行结果，如需要查看全部结果请点击按钮下载！</i></span>
        <div
          class="d-flex flex-column align-center justify-center">
          <v-icon size="100" color="primary">
            mdi-download
          </v-icon>
          <v-btn @click="download">
            下载
            <!--            <a :href="'/api/execute/downloadResult?uuid='+resultUUID" download="">下载</a>-->
          </v-btn>
        </div>
      </div>
    </v-card-text>
    <!--    <v-card-actions>-->
    <!--      <v-btn>清空</v-btn>-->
    <!--    </v-card-actions>-->
  </v-card>
</template>

<script setup>
import {ref, watch} from "vue";
import {downloadResultApi, getNodeResultListByUUIDApi, getResultByResultUUIDApi} from "@/scripts/apis/cluster_run";
import {useRouter} from "vue-router";
import CommandTerminal from "@/components/cluster/cluster_run/CommandTerminal.vue";
import SelectNodeResult from "@/components/cluster/cluster_run/SelectNodeResult.vue";
import message from "@/scripts/utils/message";
import confirmDialog from "@/scripts/utils/confirmDialog";

/**
 * 路由实例
 * @type {Router}
 */
const router = useRouter()
/**
 * 组件事件
 * @type {EmitFn<string[]>}
 */
const emit = defineEmits(['return'])
/**
 * 当前指令UUID
 * @type {Ref<any>}
 */
const currUUID = ref()
/**
 * 当前结果UUID
 * @type {Ref<UnwrapRef<undefined>>}
 */
const resultUUID = ref(undefined)
/**
 * 节点列表
 * @type {Ref<UnwrapRef<*[]>>}
 */
const nodes = ref([])
/**
 * 当前结果参数
 */
const currResultData = ref({})
/**
 * 是否正在加载
 * @type {Ref<UnwrapRef<boolean>>}
 */
const isLoading = ref(false)

/**
 * 获取集群执行结果列表
 */
const getNodeResultListByUUID = () => {
  getNodeResultListByUUIDApi(currUUID.value).then(r => {
    nodes.value = r.data.data

  })
}

/**
 * 按照结果UUID获取指令执行结果
 */
const getResultByResultUUID = () => {
  isLoading.value = true
  getResultByResultUUIDApi(resultUUID.value).then(r => {
    currResultData.value = r.data.data
    isLoading.value = false
  })
}

const download = () => {
  confirmDialog('下载', '将在新窗口中触发下载', () => {
    downloadResultApi(resultUUID.value)
  }, 'success')

}

watch(() => router.currentRoute.value.query.uuid, (n, o) => {
  currUUID.value = n
  getNodeResultListByUUID()
})
watch(() => resultUUID.value, n => {
  if (!n) null
  getResultByResultUUID()
})
</script>

<style scoped>
.tooBig {
  width: 100%;
  padding-top: 30px;
  text-align: center;
}
</style>
