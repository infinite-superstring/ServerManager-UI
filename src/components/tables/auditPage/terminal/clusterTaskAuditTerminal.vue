<template>
  <v-sheet>
    <v-card flat>
      <div ref="terminalRef" id="terminal">
        <result-too-big :show="tooBig"/>
      </div>
    </v-card>
  </v-sheet>
  <v-card>
    <v-card-text>
      <div
        class="d-flex flex-column align-center justify-center">
        <v-icon size="100" color="primary">
          mdi-download
        </v-icon>
        <v-btn disabled>下载结果文件</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {Terminal} from "@xterm/xterm";
import {onMounted, ref, watch} from "vue";
import ResultTooBig from "@/components/tables/auditPage/terminal/ResultTooBig.vue";
import {initTerminal} from "@/scripts/utils/terminalUtil";

const props = defineProps({
  command: {
    type: Array,
    default: () => {
      return []
    },
    required: true
  },
  activity: {
    type: Object,
    default: {},
    required: true
  },
  tooBig: {
    type: Boolean,
    default: false
  }
})
const terminal = ref()
const terminalRef = ref()
const init = () => {
  terminal.value = initTerminal()
  terminal.value.open(terminalRef.value);
}
onMounted(() => {
  init()
})
watch(() => props.command, () => {
  terminal.value.clear()
  props.command.forEach(item => {
    terminal.value.writeln(item)
  })
})
</script>


<style scoped>
#terminal {
  height: 100%;
}
</style>
