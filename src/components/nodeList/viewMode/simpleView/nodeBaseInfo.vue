<script>
import useClipboard from 'vue-clipboard3'
import message from "@/scripts/utils/message";

export default {
  name: "nodeBaseInfo",
  props: {
    data: {
      type: Array,
      required: true,
    },
    uuid: {
      type: String,
      required: true
    }
  },
  emits: ['click:status'],
  mounted() {

  },
  methods: {
    async copy_node_uuid() {
      try {
        const {toClipboard} = useClipboard()
        await toClipboard(this.uuid)
        message.showSuccess(this, "复制节点UUID成功", 1000)
      } catch (e) {
        message.showError(this, "复制失败")
        console.error(e)
      }
    }
  }
}
</script>

<template>
  <v-col
    cols="16"
    sm="4"
  >
    <div class="status">
      <div class="status-name">
        平台
      </div>
      <div class="status-value">
        {{ data.baseData.platform }}
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="4"
  >
    <div class="status">
      <div class="status-name">
        CPU使用率
      </div>
      <div class="status-value">
        {{ data.baseData.online ? data.baseData.cpu_usage : "未知" }}
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="4"
  >
    <div class="status">
      <div class="status-name">
        内存使用率
      </div>
      <div class="status-value">
        {{ data.baseData.online ? data.baseData.memory_used : "未知" }}
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="4"
  >
    <div class="status">
      <div class="status-name">
        在线状态
      </div>
      <div class="status-value cursor-pointer" style="color: green" v-if="data.baseData.online"
           @click="$emit('click:status', 'online')">
        <v-icon icon="mdi:mdi-check-circle-outline" size="small"/>
        在线
      </div>
      <div class="status-value cursor-pointer" style="color: red" v-else-if="!data.baseData.online && data.baseData.platform === '未知'"
           @click="$emit('click:status', 'uninitialized')">
        <v-icon icon="mdi:mdi-close-circle-outline" size="small"/>
        未初始化
      </div>
      <div class="status-value cursor-pointer" style="color: red" v-else-if="!data.baseData.online"
           @click="$emit('click:status', 'offline')">
        <v-icon icon="mdi:mdi-close-circle-outline" size="small"/>
        离线
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="4"
  >
    <div class="status">
      <div class="status-name">
        主机名
      </div>
      <div class="status-value">
        {{ data.baseData.hostname }}
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="3"
  >
    <div class="status">
      <div class="status-name">
        节点ID
      </div>
      <div class="status-value">
        <v-icon
          icon="mdi:mdi-clipboard-text-outline"
          color="primary"
          size="small"
          title="复制到剪贴板"
          @click="copy_node_uuid()"/>
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="6"
  >
    <div class="status">
      <div class="status-name">
        所有者/创建者
      </div>
      <div class="status-value">
        <v-icon icon="mdi-account-circle-outline" size="small" color="primary"/>
        {{ data.creator ? data.creator : '未知'  }}
      </div>
    </div>
  </v-col>
  <v-col
    cols="16"
    sm="6"
  >
    <div class="status">
      <div class="status-name">
        所属集群
      </div>
      <div class="status-value">
        <span title="您的权限：节点组负责人">
          {{ data.group ? data.group : '无' }}
        </span>
      </div>
    </div>
  </v-col>

</template>

<style scoped>

</style>
