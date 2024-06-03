<script>
import TimeInput from "@/components/input/timeInput.vue";

export default {
  name: "time_range_selection",
  components: {TimeInput},
  props: {
    start_time: {
      type: String,
      required: false,
      default: ""
    },
    end_time: {
      type: String,
      required: false,
      default: ""
    }
  },
  emits: ['update:start_time', 'update:end_time'],
  created() {
    this.time1 = this.start_time;
    this.time2 = this.end_time;
  },
  data: () => {
    return {
      time1: null,
      time2: null,
    }
  },
  watch: {
    start_time(val) {
      if (val !== this.time1) {
        this.time1 = val;
      }
    },
    end_time(val) {
      if (val !== this.time2) {
        this.time2 = val;
      }
    },
    time1(val) {
      this.$emit("update:start_time", val);
    },
    time2(val) {
      this.$emit("update:end_time", val);
    }
  }
}
</script>

<template>
  <v-row>
    <v-col
      cols="12"
      sm="6"
    >
      <time-input :value="time1" label="开始时间" :max = "time2" @update:value="args => time1 = args"></time-input>
    </v-col>
    <v-col
      cols="12"
      sm="6"
    >
      <time-input :value="time2" label="结束时间" :min = "time1" @update:value="args => time2 = args"></time-input>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
