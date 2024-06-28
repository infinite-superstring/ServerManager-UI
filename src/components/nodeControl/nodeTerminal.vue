<script>
import {Terminal} from "@xterm/xterm";
import {FitAddon} from "xterm-addon-fit/src/FitAddon";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";

import("@xterm/xterm/css/xterm.css")


let terminal
let fitAddon

export default {
  name: "nodeTerminal",
  components: {NodeOfflineOverlay},
  props: {
    ws: {
      type: Object,
      required: true,
    },
    node_uuid: {
      type: String,
      required: true,
    },
    online: {
      type: Boolean,
      required: true,
    }
  },
  data: () => {
    return {
      inputBuffer: "",
      historyIndex: 0,
      commandHistory: []
    }
  },
  created() {
    this.send({
      action: 'connect_terminal'
    })
  },
  mounted() {
    if (this.online) {
      this.open_terminal()
    }
  },
  methods: {
    open_terminal() {
      terminal = new Terminal({
        rendererType: "canvas", //渲染类型
        // disableStdin: true
        // rows: 30, //行数
        // cols: 100, // 不指定行数，自动回车后光标从下一行开始
        convertEol: true, //启用时，光标将设置为下一行的开头
        cursorBlink: true,
        macOptionIsMeta: true

      });

      fitAddon = new FitAddon()
      terminal.loadAddon(fitAddon);
      terminal.open(this.$refs.terminal)
      // terminal.open(document.getElementById('terminal'))
      window.addEventListener('resize', () => {
      fitAddon.fit();
    });
      this.ws.onmessage = (message) => {
        // console.log(message)
        let data = null
        try {
          data = JSON.parse(event.data)
          fitAddon.fit();
        } catch (e) {
          console.error(e)
          message.showError(this, `JSON数据解析失败：${e.message}`)
        }
        switch (data.action) {
          case "terminal_output":
            terminal.write(data.data)
            break
          default:
            break
        }
      }
      terminal.onKey(({key, domEvent}) => {
        // Example: Handling Ctrl+C
        console.log(domEvent)
        const modifiers = [];
        if (domEvent.ctrlKey) modifiers.push('Ctrl');
        if (domEvent.altKey) modifiers.push('Alt');
        if (domEvent.shiftKey) modifiers.push('Shift');
        this.send({
          action: 'terminal_input',
          data: key
        })
      });
    },
    send(data) {
      this.ws.send(JSON.stringify(data))
    }
  },
  watch: {
    online(val) {
      if (val) {
        this.open_terminal()
      }
    }
  }
}
</script>

<template>
  <v-sheet height="75vh" max-height="800px" width="100%">
    <node-offline-overlay :flag="!online"/>
    <div id="terminal" ref="terminal" v-if="online" style="height: 100%"></div>
  </v-sheet>
</template>

<style scoped>

</style>
