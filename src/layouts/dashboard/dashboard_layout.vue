<script>
import Overview_card from "@/components/dashboard/overview_card.vue";
import Node_list_card from "@/components/dashboard/node_list_card.vue";
import Statistics_list_card from "@/components/dashboard/statistics_list_card.vue";
import UserInfoCard from "@/components/dashboard/user_info_card.vue";
import TaskCard from "@/components/dashboard/TaskCard.vue";
import Group_task_list_card from "@/components/dashboard/group_task_list_card.vue";

export default {
  name: "dashboard_layout",
  components: {Group_task_list_card, TaskCard, UserInfoCard, Statistics_list_card, Node_list_card, Overview_card}
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">总览</p>
        </v-card-title>
        <v-card-text height="300px" id="overview">
          <overview_card/>
        </v-card-text>
      </v-card>
      <v-card
        class="dashboard_card"
        v-if="$user.check_user_permission([
            'editNode',
            'viewAllNode',
            'editNodeGroup'
        ])"
      >
        <v-card-title class="d-flex justify-sm-space-between align-center">
          <p class="dashboard_subtitle text-no-wrap">节点列表</p>
          <p class="more cursor-pointer" @click="$router.push({ name: 'nodeList' })">更多...</p>
        </v-card-title>
        <v-card-text height="300px">
          <node_list_card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">统计信息</p>
        </v-card-title>
        <v-card-text>
          <statistics_list_card/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="12" md="4">
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">
            个人信息
          </p>
        </v-card-title>
        <v-card-text class="user_info">
          <user-info-card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">
            每日打卡
          </p>
        </v-card-title>
        <v-card-text>
          <TaskCard/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card" v-if="$user.check_user_permission('clusterTask')">
        <v-card-title class="d-flex justify-sm-space-between align-center">
          <p class="dashboard_subtitle">
            集群任务
          </p>
          <p class="more cursor-pointer" @click="$router.push({ name: 'clusterTask' })">更多...</p>
        </v-card-title>
        <v-card-text>
          <group_task_list_card/>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.dashboard_subtitle {
  font-size: 14px;
  color: #707070;
  padding-left: 5px;
  border-left: #0288D1 5px solid;
}

.dashboard_card:not(:last-child) {
  margin-bottom: 10px;
}

#overview {
  display: flex;
}
.more {
  font-size: 12px;
  color: #adadad;
  line-height: 100%;
}
</style>
