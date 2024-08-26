<script>
import general_chart from "@/components/dashboard/general_chart.vue";
import {getStatisticsApi} from "@/scripts/apis/dashboard";

export default {
  name: "statistics_list_card",
  components: {general_chart},
  data() {
    return {
      api_speed: {
        labels: [],
        datasets: []
      },
      alarm_trend: {
        labels: [],
        datasets: []
      }
    }
  },
  mounted() {
    this.getStatistics()
  },
  methods: {
    getStatistics() {
      getStatisticsApi().then(res => {
        this.api_speed.labels = Object.keys(res.data.data.API_Speed).map(key => parseInt(key));
        this.api_speed.datasets = [{
          data: Object.values(res.data.data.API_Speed),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        }]

        this.alarm_trend.labels = Object.keys(res.data.data.alarm_trend).map(key => parseInt(key));
        this.alarm_trend.datasets = [{
          data: Object.values(res.data.data.alarm_trend),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        }]
        console.log(this.api_speed);
      })
    }
  },
  watch: {}
}
</script>

<template>
  <v-row>
    <v-card flat width="100%">
      <v-card-title>
        {{ $t('dashboard.statistics.api_speed') }}
      </v-card-title>
      <v-card-text>
        <general_chart
          v-if="api_speed.labels.length > 0"
          :datasets="api_speed.datasets"
          :labels="api_speed.labels"
        />
      </v-card-text>
    </v-card>
  </v-row>
  <v-row>
    <v-card flat width="100%">
      <v-card-title>
        {{ $t('dashboard.statistics.warn_trend') }}
      </v-card-title>
      <v-card-text>
        <general_chart
          v-if="alarm_trend.labels.length > 0"
          :datasets="alarm_trend.datasets"
          :labels="alarm_trend.labels"
        />
      </v-card-text>
    </v-card>
  </v-row>
</template>

<style scoped>
.v-card-title {
  font-size: 14px;
}
</style>
