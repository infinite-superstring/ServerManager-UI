<script>
export default {
  name: "timeInput",
  props: {
    value: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: false,
      default: "时间"
    },
    max: {
      type: String,
      required: false,
    },
    min: {
      type: String,
      required: false,
    },
    "prepend-icon": {
      type: String,
      required: false,
    }
  },
  emits: ['update:value'],
  data: () => {
    return {
      time: '',
      flag: false
    }
  },
  created() {
    this.time = this.value ? this.value : ""
  },
  watch: {
    value(val) {
      if (val !== this.time) {
        this.time = val
      }
    },
    time(val) {
      this.$emit('update:value', val)
    }
  },
  mounted() {
    console.log(this.value)
    if (this.value) this.time = this.value
  }
}
</script>

<template>
  <v-text-field
    v-model="time"
    :active="flag"
    :focus="flag"
    :label="label"
    :prepend-icon="prepend-icon"
    readonly
  >
    <v-menu
      v-model="flag"
      :close-on-content-click="false"
      activator="parent"
      transition="scale-transition"
    >
      <v-time-picker
        v-if="flag"
        v-model="time"
        :min="min"
        :max="max"
        :title="label"
        format="24hr"
        color="primary"
        full-width
      ></v-time-picker>
    </v-menu>
  </v-text-field>
</template>

<style scoped>

</style>
