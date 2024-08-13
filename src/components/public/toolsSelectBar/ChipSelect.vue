<template>
  <v-chip-group
    selected-class="text-primary"
    :multiple="item.type === 'checkbox'"
  >
    <v-chip
      v-for="(op, index) in item.optional"
      :key="index"
      @click="emit('select', {prop:item.prop,value:op.value,type:item.type})"
    >{{ op.label }}
    </v-chip>
  </v-chip-group>
</template>

<script setup>
const emit = defineEmits(['select'])
const props = defineProps({
  item: {
    type: Object,
    default: {
      type: '',
      optional: []
    }
  }
})
</script>


<style scoped>

</style>
