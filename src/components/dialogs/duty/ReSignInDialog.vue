<template>
  <v-dialog
    persistent
    v-model="status"
    width="400"
  >
    <v-card>
      <v-card-title>
        <span>人工补签</span>
      </v-card-title>
      <v-card-text>
        用户: {{ userInfo.realName }}<br>
        补签时间:{{ format.formatTimestampToStr(reDate.getTime() + 3600000 * 8) }} <br>
        <div>
          <v-date-input
            v-model="reDate"
            color="primary"
            cancel-text="取消"
            ok-text="确定"
            label="选择补签时间">

          </v-date-input>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="close()">取消</v-btn>
        <v-btn color="success" @click="submit()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import axiosplus from "@/scripts/utils/axios";
import message from "@/scripts/utils/message";
import format from "../../../scripts/utils/format";

const props = defineProps({
  status: {
    required: true,
    type: Boolean,
    default: false
  },
  userId: {
    required: true,
    type: Number,
    default: NaN
  }
})

const userInfo = ref({})
let date = new Date();
date.setHours(8, 0, 0, 0)
const reDate = ref(date)
const status = ref(props.status)

const emit = defineEmits(['submit', 'close'])

const close = () => {
  emit('close')
}

const getUserInfo = () => {
  axiosplus.post('/api/admin/userManager/getUserInfo', {id: props.userId})
    .then(r => {
      userInfo.value = r.data.data
    })
}

const submit = () => {
  reDate.value.setHours(8, 0, 0, 0)
  axiosplus.post('/api/task/attendanceCheckIn', {
    userId: props.userId,
    timestamp: format.formatTimestampToStr(reDate.value.getTime())
  })
    .then(r => {
      if (r.data.data === false) {
        message.showWarning(this, r.data.msg)
      } else {
        message.showSuccess(this, r.data.msg)
        emit('submit')
      }
    })
}


watch(() => props.status, (val) => {
  if (val) {
    if (!props.userId) {
      close()
      message.showWarning(this, '未选择用户')
      return
    }
    getUserInfo()
  }
  status.value = val
})
</script>


<style scoped>

</style>
