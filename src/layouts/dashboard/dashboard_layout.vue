<script>
import Overview_card from "@/components/dashboard/overview_card.vue";
import Node_list_card from "@/components/dashboard/node_list_card.vue";
import Statistics_list_card from "@/components/dashboard/statistics_list_card.vue";
import UserInfoCard from "@/components/dashboard/user_info_card.vue";
import TaskCard from "@/components/dashboard/TaskCard.vue";

export default {
  name: "dashboard_layout",
  components: {TaskCard, UserInfoCard, Statistics_list_card, Node_list_card, Overview_card}
}
</script>

<template>
  <v-row>
    <v-col>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle">总览</p>
        </v-card-title>
        <v-card-text height="300px" id="overview">
          <overview_card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle">节点列表</p>
        </v-card-title>
        <v-card-text height="300px">
          <node_list_card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle">统计信息</p>
        </v-card-title>
        <v-card-text>
          <statistics_list_card/>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle">
            个人信息
          </p>
        </v-card-title>
        <v-card-text class="user_info">
          <user-info-card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle">
            待处理任务
          </p>
        </v-card-title>
        <v-card-text>
          <TaskCard/>
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
</style>
