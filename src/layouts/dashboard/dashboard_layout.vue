<script>
import Overview_card from "@/components/dashboard/overview_card.vue";
import Node_list_card from "@/components/dashboard/node_list_card.vue";
import Statistics_list_card from "@/components/dashboard/statistics_list_card.vue";
import UserInfoCard from "@/components/dashboard/user_info_card.vue";
import TaskCard from "@/components/dashboard/TaskCard.vue";
import Group_task_list_card from "@/components/dashboard/group_task_list_card.vue";
import {check_user_permission} from "@/scripts/utils/permission";

export default {
  name: "dashboard_layout",
  components: {Group_task_list_card, TaskCard, UserInfoCard, Statistics_list_card, Node_list_card, Overview_card},
  methods: {
    check_user_permission() {
      return check_user_permission
    }
  }
}
</script>

<template>
  <v-row>
    <v-col cols="12" md="8">
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">{{ $t('dashboard.overview.title') }}</p>
        </v-card-title>
        <v-card-text height="300px" id="overview">
          <overview_card/>
        </v-card-text>
      </v-card>
      <v-card
        class="dashboard_card"
        v-if="check_user_permission([
            'editNode',
            'viewAllNode',
            'editNodeGroup'
        ])"
      >
        <v-card-title class="d-flex justify-sm-space-between align-center">
          <p class="dashboard_subtitle text-no-wrap">{{ $t('dashboard.node_list.title') }}</p>
          <p
            class="more cursor-pointer"
            :title="$t('dashboard.node_list.more__title')"
            @click="$router.push({ name: 'nodeList' })"
          >
            {{ $t('dashboard.node_list.more') }}
          </p>
        </v-card-title>
        <v-card-text height="300px">
          <node_list_card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">{{ $t('dashboard.statistics.title') }}</p>
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
            {{ $t('dashboard.user_info.title') }}
          </p>
        </v-card-title>
        <v-card-text class="user_info">
          <user-info-card/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card">
        <v-card-title>
          <p class="dashboard_subtitle text-no-wrap">
            {{ $t('dashboard.user_task.title') }}
          </p>
        </v-card-title>
        <v-card-text>
          <TaskCard/>
        </v-card-text>
      </v-card>
      <v-card class="dashboard_card" v-if="check_user_permission('clusterTask')">
        <v-card-title class="d-flex justify-sm-space-between align-center">
          <p class="dashboard_subtitle">
            {{ $t('dashboard.group_task.title') }}
          </p>
          <p class="more cursor-pointer" :title="$t('dashboard.group_task.more__title')" @click="$router.push({ name: 'clusterTask' })">
            {{ $t('dashboard.group_task.more') }}
          </p>
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
