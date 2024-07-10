<template>
  <v-dialog
    v-model="status"
    persistent
    max-width="80%"
    min-width="80%"
  >
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>

        <div class="form-content">
          <div class="form-item">
            <v-text-field
              v-model="formData.taskName"
              label="任务名称"
              hint="唯一名称，不可重复"
              variant="underlined"
              persistent-hint
              required
            />
          </div>
          <div class="form-item">
            <v-autocomplete
              v-model="formData.group"
              :items="groupList"
              item-value="group_id"
              item-title="group_name"
              :label="groupList.length > 0 ? '指定节点组执行任务' : '无可用节点组'"
              hint="指定节点组执行任务"
              variant="underlined"
              persistent-hint
              required
            />
          </div>
          <div class="form-item">
            <!--只能输入整数-->
            <v-text-field
              v-model="formData.execCount"
              @input="inputUtil.integer"
              step="1"
              type="number"
              :label="formData.execType === 'date-time' ? '不可用' : '循环执行次数'"
              :hint="formData.execType === 'date-time' ? '指定时间时不可用' : '留空为无限'"
              variant="underlined"
              persistent-hint
              :disabled="formData.execType === 'date-time'"
            />
          </div>
          <div class="form-item">
            <v-select
              label="执行方式"
              v-model="formData.execType"
              :items="execType"
              hint="指定一种执行方式"
              variant="underlined"
              persistent-hint
            />
          </div>
          <IntervalExec
            v-model="formData.execInterval"
            v-if="formData.execType === 'interval'"
          />
          <CycleExec
            v-model="formData.execCycle"
            v-if="formData.execType === 'cycle'"
          />
          <DateTimeExec
            v-model="formData.execTime"
            v-if="formData.execType === 'date-time'"
          />
          <div class="form-item">
            <v-text-field
              v-model="formData.execPath"
              label="执行路径|环境"
              hint="默认为 / "
              variant="underlined"
              persistent-hint
              required
            />
          </div>
          <div class="form-item">
            <v-checkbox
              v-model="formData.enable"
              hide-details
              label="默认是否启用"
            />
          </div>
          <ClusterCommand v-model="formData.command"/>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="green" @click="emit('submit', formData)">确定</v-btn>
        <v-btn color="red" @click="emit('close')">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

import inputUtil from "@/scripts/utils/inputUtil";
import DateTimeExec from "@/components/cluster/form/DateTimeExec.vue";
import ClusterCommand from "@/components/cluster/form/ClusterCommand.vue";
import CycleExec from "@/components/cluster/form/CycleExec.vue";
import IntervalExec from "@/components/cluster/form/IntervalExec.vue";

const status = defineModel()
const formData = defineModel('data')
const emit = defineEmits(['submit', 'close'])

defineExpose({
  formData
})
</script>


<style scoped>

</style>
