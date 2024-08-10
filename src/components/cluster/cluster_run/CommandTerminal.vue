<template>
  <div id="terminal" ref="terminalRef">
    <v-overlay
      v-if="loading"
      class="align-center justify-center cursor-not-allowed substance"
      :model-value="true"
      contained
      persistent
      no-click-animation
    >
      <Loading v-if="loading"/>
    </v-overlay>
  </div>
</template>

<script setup>
import {onMounted, ref, watch} from "vue";
import {initTerminal} from "@/scripts/utils/terminalUtil";
import Loading from "@/components/public/Loading.vue";


const terminalRef = ref(null)
const terminal = ref()

const props = defineProps({
  command: {
    type: Array,
    default: () => {
      return []
    },
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  warning: {
    type: Boolean,
    default: false
  },
  warning_text: {
    type: String,
    default: "出现了一些问题"
  },
  warning_click_callback: {
    type: Function,
    default: () => {
      return () => {
      }
    }
  }
})

onMounted(() => {
  terminal.value = initTerminal()
  terminal.value.open(terminalRef.value);
})

watch(() => props.command, () => {
  terminal.value.clear()
  if (props.command.length > 0) {
    for (let i = 0; i < props.command.length; i++) {
      terminal.value.writeln(props.command[i])
    }
  }
})
</script>


<style scoped>
#terminal {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
