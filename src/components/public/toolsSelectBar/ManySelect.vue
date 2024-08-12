<template>
  <div class="many" ref="manyRef">
    <v-card>
      <v-card-text>
        <v-row v-for="(item, index) in options" :key="index">
          <v-col cols="1" class="label">
            <span class="font-weight-black">{{ item.label }}</span>
          </v-col>
          <v-col cols="11">
            <v-chip-group selected-class="text-primary">
              <v-chip
                v-for="(op, index) in item.optional"
                :key="index"
                @click="emit('select', {prop:item.prop,value:op.value})"
              >{{ op.label }}
              </v-chip>
            </v-chip-group>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
const emit = defineEmits(['select'])
const manyRef = ref()
const props = defineProps({
  open: {
    type: Boolean,
    default: false
  },
  options: {
    type: Array,
    default: () => [
      {
        prop: 'name',
        label: '选项1',
        optional: [
          {
            label: '选项1-1',
            value: '1-1'
          },
          {
            label: '选项1-2',
            value: '1-2'
          },
          {
            label: '选项1-3',
            value: '1-3'
          }
        ],
        radio: true,
      }
    ]
  }
})
onMounted(() => {
  let el = manyRef.value
  el.style.height = props.open ? 'auto' : '0px'
})
watch(() => props.open, n => {
  let el = manyRef.value
  if (n) {
    el.style.height = 'auto'
    const {height} = el.getBoundingClientRect()
    el.style.height = 0
    el.style.transition = 'all .5s'
    el.offsetHeight;
    el.style.height = `${height}px`
  } else {
    el.style.height = 0
  }
})
</script>


<style scoped>
.many {
  padding: 10px;
  display: block;
  width: 100%;
  height: 0;
  transition: all .5s;
  overflow: hidden;
}

.label {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
