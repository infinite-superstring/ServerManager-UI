<script>
export default {
  name: "inputTag",
  props: {
    label: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: false
    },
    tags: {
      type: Array,
      required: false
    },
    density: {
      type: String,
      required: false,
      default: "default"
    }
  },
  emits: ["input", 'update:chips'],
  data() {
    return {
      chips: [],
    }
  },
  mounted() {
    // if (this.tags) {
    //   console.log(this.tags)
    //   this.chips = this.tags
    // }
  },
  methods: {
    remove(item) {
      this.chips.splice(this.chips.indexOf(item), 1)
    },
  },
  watch: {
    tags(val) {
      if (val !== this.chips) {
        this.chips = val
      }
    },
    chips(val) {
      this.$emit('update:chips', val)
    }
  }
}
</script>

<template>
  <v-combobox
    clearable
    multiple
    :density="density"
    :label="label"
    v-model="chips"
    :items="items"
    @input="$event => {this.$emit('input', $event.target.value)}"
  >
    <template v-slot:selection="data">
      <v-chip
        :key="data.item"
        :model-value="data.selected"
        size="small"
        color="primary"
        @click:close="chips.splice(data.index, 1)"
        closable
      >
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<style scoped>

</style>
