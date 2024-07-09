<script>
import NodeBaseInfo from "@/components/nodeList/viewMode/simpleView/nodeBaseInfo.vue";

export default {
  name: "simpleView",
  components: {NodeBaseInfo},
  props: {
    nodeList: {
      type: Array,
      required: true
    }
  },
  emits: ['action:del_node', 'action:reset_token', 'action:click_tag', 'action:edit', 'action:click_status'],
}
</script>

<template>
  <v-container class="machine-list">
    <v-card
      class="machine-item"
      v-for="item in nodeList"
      :key="item.uuid"
    >
      <v-card-title class="machine-name">
        {{ item.name }}
        <div class="machine-action">
          <v-btn variant="text" size="x-small" @click="$emit('action:reset_token', item.uuid)">重置Token</v-btn>
          <v-btn variant="text" size="x-small" color="red" @click="$emit('action:del_node', item.uuid)">删除节点</v-btn>
        </div>
      </v-card-title>
      <v-card-text>
        <v-row>
          <node-base-info
            :uuid="item.uuid"
            :data="item.baseData"
            @click:status="args => $emit('action:click_status', args)"
          />
        </v-row>
        <p class="description" v-if="item.description">
          <v-divider/>
          {{ item.description }}
        </p>
        <div class="tags" v-if="item.tags.length > 0">
          <v-divider/>
          <v-chip
            color="secondary"
            v-for="tag in item.tags"
            :key="tag"
            @click="$emit('action:click_tag', tag)"
          >
            {{ tag }}
          </v-chip>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" block @click='this.$router.push({name:"nodeControl", hash: `#${item.uuid}`})'>
          进入控制页
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<style scoped>
.machine-name {
  display: flex;
  justify-content: space-between;
}

.machine-list {
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.machine-item {
  width: 32%;
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1000px) {
  .machine-item {
    width: 49%;
  }

}

@media screen and (max-width: 570px) {
  .machine-item {
    width: 100%;
  }
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
</style>
