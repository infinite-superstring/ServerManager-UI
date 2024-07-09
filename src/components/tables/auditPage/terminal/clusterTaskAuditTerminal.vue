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
        <v-btn>下载结果文件</v-btn>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import {Terminal} from "@xterm/xterm";
import {onMounted, ref, watch} from "vue";
import ResultTooBig from "@/components/tables/auditPage/terminal/ResultTooBig.vue";

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
  tooBig:{
    type: Boolean,
    default: false
  }
})
const terminal = ref()
const terminalRef = ref()
const init = () => {
  terminal.value = new Terminal({
    rendererType: "canvas",
    convertEol: true,
    cursorBlink: true,
    macOptionIsMeta: true,
    theme: {
      background: '#272822',
      foreground: '#F8F8F2',
      cursor: '#F8F8F2',
      selection: 'rgba(248, 248, 242, 0.3)',
      black: '#272822',
      red: '#F92672',
      green: '#A6E22E',
      yellow: '#F4BF75',
      blue: '#66D9EF',
      magenta: '#AE81FF',
      cyan: '#A1EFE4',
      white: '#F8F8F2',
      brightBlack: '#75715E',
      brightRed: '#F92672',
      brightGreen: '#A6E22E',
      brightYellow: '#F4BF75',
      brightBlue: '#66D9EF',
      brightMagenta: '#AE81FF',
      brightCyan: '#A1EFE4',
      brightWhite: '#F8F8F2',
    }
  })
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
