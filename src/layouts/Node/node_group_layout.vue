<script>
import node_group_list_layout from "@/layouts/Node/node_group_layouts/node_group_list_layout.vue";
import node_group_alarm_setting_layout from "@/layouts/Node/node_group_layouts/node_group_alarm_setting_layout.vue";

export default {
  name: "node_group_edit_layout",
  components: {
    node_group_alarm_setting_layout,
    node_group_list_layout
  },
  data() {
    return {
      tab: "group_list",
    }
  }
}
</script>

<template>
  <node_group_list_layout/>
<!--  <v-card>-->
<!--    <v-tabs-->
<!--      v-model="tab"-->
<!--      color="primary"-->
<!--    >-->
<!--      <v-tab value="group_list">集群列表</v-tab>-->
<!--      <v-tab value="group_alarm_setting">集群告警设置</v-tab>-->
<!--    </v-tabs>-->

<!--    <v-card-text>-->
<!--      <v-tabs-window v-model="tab">-->
<!--        <v-tabs-window-item value="group_list">-->
<!--          <node_group_list_layout/>-->
<!--        </v-tabs-window-item>-->

<!--        <v-tabs-window-item value="group_alarm_setting">-->
<!--          <node_group_alarm_setting_layout/>-->
<!--        </v-tabs-window-item>-->
<!--      </v-tabs-window>-->
<!--    </v-card-text>-->
<!--  </v-card>-->
</template>

<style scoped>

</style>
