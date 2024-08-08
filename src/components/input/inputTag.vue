<script>
import node_tags from "@/scripts/apis/node_tags";
import login from "@/layouts/login.vue";
import {debounce} from "@/scripts/utils/debounce";

export default {
  name: "inputTag",
  computed: {
    login() {
      return login
    }
  },
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: Array,
      required: false
    },
    density: {
      type: String,
      required: false,
      default: "default"
    }
  },
  emits: ['update'],
  data() {
    return {
      select: [],
      tags: [],
      debounce: debounce(this.search_tag, 300),
    }
  },
  mounted() {
    // console.log(this.value)
    // if (this.value) {
    //   this.select = this.value
    // }
    this.search_tag()
  },
  methods: {
    search_tag(search="") {
      if (!search) {return}
      node_tags.search_tag(search).then(res => {
        this.tags = res.data.data.tags
      })
    },
    select_splice(index) {
      this.select.splice(index, 1)
      this.update()
    },
    update() {
      this.$emit('update', this.select)
    }
  },
  watch: {
    value(val) {
      console.log(val)
      if (!val || val === this.select) {return}
      this.select = val
    }
  }
}
</script>

<template>
  <v-combobox
    multiple
    :density="density"
    :label="label"
    v-model="select"
    :items="tags"
    @input="$event => debounce($event.target.value)"
    @update:model-value="update"
  >
    <template v-slot:selection="data">
      <v-chip
        class="ma-1"
        :key="data.item"
        :model-value="data.selected"
        size="small"
        color="primary"
        @click:close="select_splice(data.index)"
        closable
      >
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-combobox>
</template>

<style scoped>

</style>
