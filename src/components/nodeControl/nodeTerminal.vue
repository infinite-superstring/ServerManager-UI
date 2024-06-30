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
    return {}
  },
  mounted() {
    this.send({
      action: 'terminal:connect'
    })
    if (this.online) {
      this.open_terminal()
    }
  },
  unmounted() {
    this.send({
      action: 'terminal:close'
    })
  },
  methods: {
    open_terminal() {
      terminal = new Terminal({
        rendererType: "canvas", //渲染类型
        convertEol: true, //启用时，光标将设置为下一行的开头
        cursorBlink: true,
        macOptionIsMeta: true,
        theme: {
          background: '#272822', // 背景色
          foreground: '#F8F8F2', // 前景色
          cursor: '#F8F8F2', // 光标颜色
          selection: 'rgba(248, 248, 242, 0.3)', // 选中文本颜色
          black: '#272822', // 基本黑色
          red: '#F92672', // 基本红色
          green: '#A6E22E', // 基本绿色
          yellow: '#F4BF75', // 基本黄色
          blue: '#66D9EF', // 基本蓝色
          magenta: '#AE81FF', // 基本紫色
          cyan: '#A1EFE4', // 基本青色
          white: '#F8F8F2', // 基本白色
          brightBlack: '#75715E', // 亮黑色
          brightRed: '#F92672', // 亮红色
          brightGreen: '#A6E22E', // 亮绿色
          brightYellow: '#F4BF75', // 亮黄色
          brightBlue: '#66D9EF', // 亮蓝色
          brightMagenta: '#AE81FF', // 亮紫色
          brightCyan: '#A1EFE4', // 亮青色
          brightWhite: '#F8F8F2', // 亮白色
        }
      });

      fitAddon = new FitAddon()
      terminal.loadAddon(fitAddon);
      terminal.open(this.$refs.terminal)
      window.addEventListener('resize', () => {
        this.resize()
      });
      this.resize()
      this.ws.onmessage = (message) => {
        // console.log(message)
        let data = null
        try {
          data = JSON.parse(event.data)
          // fitAddon.fit();
        } catch (e) {
          console.error(e)
          message.showError(this, `JSON数据解析失败：${e.message}`)
        }
        switch (data.action) {
          case "terminal:output":
            terminal.write(data.data)
            break
        }
      }
      terminal.onKey(({key}) => {
        this.input(key)
      });
      terminal.element.addEventListener('compositionend', (event) => {
        const text = event.data;
        this.input(text)
      });
      // 处理键盘按下事件
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
          document.execCommand('copy');
          e.preventDefault();
        }

        if (e.ctrlKey && e.shiftKey && e.code === 'KeyV') {
          navigator.clipboard.readText().then((text) => {
            console.log(text);
            this.input(text)
          });
          e.preventDefault();
        }
      });
    },
    resize() {
      fitAddon.fit();
      const cols = terminal.cols;
      const rows = terminal.rows;
      this.send({
        action: 'terminal:resize',
        data: {
          cols: cols,
          rows: rows
        }
      })
    },
    input(key) {
      this.send({
        action: 'terminal:input',
        data: key
      })
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
@font-face {
    font-family: 'NotoSansSC-Medium'; /* 自定义字体名称 */
    src: url('/public/fonts/NotoSansSC-Medium.otf');
}

#terminal {
  font-family: 'NotoSansSC-Medium' ,'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #272822; /* 背景色为 Monokai 的背景色 */
  color: #F8F8F2; /* 前景色为 Monokai 的前景色 */
}
</style>
