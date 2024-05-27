<script>
import {Terminal} from "@xterm/xterm";
import("@xterm/xterm/css/xterm.css")


let terminal

export default {
  name: "nodeTerminal",
  props: {
    ws: {
      type: Object,
      required: true,
    },
    node_uuid: {
      type: String,
      required: true,
    }
  },
  created() {
    this.send({
      action: 'connect_terminal'
    })
  },
  mounted() {
    terminal = new Terminal();
    terminal.open(this.$refs.terminal)
    terminal.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
  },
  methods: {
    send(data) {
      this.ws.send(JSON.stringify(data))
    }
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
