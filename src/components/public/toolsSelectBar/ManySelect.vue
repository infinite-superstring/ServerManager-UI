<template>
  <div class="many" ref="manyRef">
    <v-card style="margin: 5px">
      <v-card-text>
        <!--        <v-row class="row" v-for="(item, index) in options" :key="index">-->
        <!--          <v-col-->
        <!--            cols="1"-->
        <!--            class="row-left">-->
        <!--            <span class="font-weight-black">{{ item.label }}</span>-->
        <!--          </v-col>-->
        <!--          <v-col class="row-right">-->
        <!--            <ChipSelect-->
        <!--              v-if="item.type === 'radio' || item.type === 'checkbox'"-->
        <!--              :item="item"-->
        <!--              @select="args => emit('select', args)"-->
        <!--            />-->
        <!--            <TimeRange-->
        <!--              v-if="item.type === 'date-range'"-->
        <!--              @input="data => emit('select', {prop:item.prop,value:data,type:item.type})"-->
        <!--            />-->
        <!--          </v-col>-->
        <!--        </v-row>-->


        <div class="row" v-for="(item, index) in options" :key="index">
          <div
            class="row-left">
            <span class="font-weight-black">{{ item.label }}</span>
          </div>
          <div class="row-right">
            <ChipSelect
              v-if="item.type === 'radio' || item.type === 'checkbox'"
              :item="item"
              @select="args => emit('select', args)"
            />
            <TimeRange
              v-if="item.type === 'date-range'"
              @input="data => emit('select', {prop:item.prop,value:data,type:item.type})"
            />
          </div>
        </div>


      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>

import {onMounted, ref, watch} from "vue";
import ChipSelect from "@/components/public/toolsSelectBar/ChipSelect.vue";
import TimeRange from "@/components/public/toolsSelectBar/TimeRange.vue";

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
        optional: {
          type: Array,
          default: () => [
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
          ]
        },
        type: {
          type: 'radio' | 'checkbox' | 'date' | 'date-range',
          default: 'radio'
        },
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
  display: block;
  width: 100%;
  height: 0;
  transition: all .5s;
  overflow: hidden;
}

/*
.row, .row-left, .row-right {
  display: flex;
  align-items: center;
}

.row-left {
  justify-content: end;
}
*/

.row, .row-left, .row-right {
  width: 100%;
  display: flex;
  align-items: center;
}

.row-left {
  padding-right: 20px;
  justify-content: end;
  width: 100px;
}

.row-right {
  flex-wrap: wrap;
}

@media screen and (max-width: 730px) {
  .row-left {
    min-width: 100px;
  }
}

@media screen and (max-width: 430px) {
  .row-left {
    min-width: 100px;
  }
}


</style>
