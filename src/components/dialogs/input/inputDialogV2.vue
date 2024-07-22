<script>
export default {
  name: "inputDialogV2",
  props: {
    title: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: false,
      default: ""
    },
    hint: {
      type: String,
      required: false,
      default: ""
    },
    type: {
      type: String,
      required: false,
      default: "text"
    },
    persistent: {
      type: Boolean,
      required: false,
      default: null
    },
    default_value: {
      type: [String, Number],
      required: false,
      default: ""
    },
    max: {
      type: Number,
      required: false,
      default: null
    },
    min: {
      type: Number,
      required: false,
      default: null
    },
    confirm: {
      type: Function,
      required: true,
    },
    close: {
      type: Function,
      required: true,
    }
  },
  data() {
    return {
      flag: true,
      value: null,
    }
  },
  created() {
    if (this.default_value) {
      this.value = this.default_value
    }
  },
  watch: {
    value(newVal, oldVal) {
      if (newVal === oldVal || newVal === this.default_value) { return }
      if (this.type === "text") {
        if (newVal === null) {return}
        if (newVal.length > this.max) {
          this.value = oldVal
        } else if (newVal.length < this.min) {
          this.value = oldVal
        }
      }
      if (this.type === "number") {
        if (newVal > this.max) {
          this.value = this.max
        } else if (newVal < this.min) {
          this.value = this.min
        }
      }
    }
  }
}
</script>

<template>
  <v-dialog
    id="inputDialog"
    v-model="flag"
    activator="parent"
    min-width="400px"
    width="auto"
    :persistent="persistent"
    @close="close()"
  >
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-model="value"
          :label="label"
          :hint="hint"
          :type="type"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="confirm(value)">确定</v-btn>
        <v-btn color="error" @click="close()">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
