<script>
import {Terminal} from "@xterm/xterm";
import("@xterm/xterm/css/xterm.css")


let terminal

export default {
  name: "nodeTerminal",
  mounted() {
    terminal = new Terminal();
    terminal.open(this.$refs.terminal)
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  }
}
</script>

<template>
  <v-sheet height="800px" width="100%">
    <div id="terminal" ref="terminal"></div>
  </v-sheet>
</template>

<style scoped>

</style>
