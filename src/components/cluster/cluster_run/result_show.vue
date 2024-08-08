<template>
  <v-card>
    <v-card-title>
      <v-btn icon="mdi:mdi-arrow-left" variant="text" @click="$emit('return')"/>
      执行结果(UUID)
    </v-card-title>
    <v-card-text height="600px">
      <SelectNodeResult v-model="resultUUID" :nodes="nodes"/>
      <v-sheet width="100%">
        <CommandTerminal></CommandTerminal>
      </v-sheet>
    </v-card-text>
    <!--    <v-card-actions>-->
    <!--      <v-btn>清空</v-btn>-->
    <!--    </v-card-actions>-->
  </v-card>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {getNodeResultListByUUIDApi} from "@/scripts/apis/cluster_run";
import {useRouter} from "vue-router";
import CommandTerminal from "@/components/cluster/cluster_run/CommandTerminal.vue";
import SelectNodeResult from "@/components/cluster/cluster_run/SelectNodeResult.vue";

const router = useRouter()
const emit = defineEmits(['return'])
const currUUID = ref()
const resultUUID = ref(undefined)
const nodes = ref([])

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

</style>
