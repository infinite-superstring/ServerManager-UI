<script>
import {Terminal} from "@xterm/xterm";
import {FitAddon} from "xterm-addon-fit/src/FitAddon";

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
    terminal = new Terminal({
      // disableStdin: true
      rows: 40, //行数
      cols: 100, // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, //启用时，光标将设置为下一行的开头
    });
    terminal.open(this.$refs.terminal)
    // terminal.loadAddon(new AttachAddon(this.ws))
    terminal.loadAddon(new FitAddon())
    window.addEventListener("resize", this.resizeScreen)
    this.ws.onmessage = (message) => {
      console.log(message)
      let data = null
      try {
        data = JSON.parse(event.data)
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
    terminal.onData(data => {
      if (data === '\r') { // 如果是回车键
        // 发送用户输入的完整命令到后端
        this.send({
          action: 'terminal_input',
          data: this.inputBuffer
        })
        terminal.write("\n");
        this.commandHistory.unshift(this.inputBuffer); // 将命令添加到历史记录的开头
        this.inputBuffer = ''; // 清空输入缓冲
        this.historyIndex = -1; // 重置历史记录索引
      } else if (data === '\x7f') { // 如果是退格键
        if (this.inputBuffer.length > 0) {
          this.inputBuffer = this.inputBuffer.slice(0, -1); // 删除最后一个字符
          terminal.write('\b \b'); // 在终端上擦除最后一个字符
        }
      } else if (data === '\u001b[A') { // 如果是上箭头键
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          terminal.write("\x1b[2K\x1b[0G" + this.commandHistory[this.historyIndex]); // 清除当前行并显示历史命令
          this.inputBuffer = this.commandHistory[this.historyIndex]; // 更新输入缓冲
        }
      } else if (data === '\u001b[B') { // 如果是下箭头键
        if (this.historyIndex >= 0) {
          this.historyIndex--;
          if (this.historyIndex === -1) {
            terminal.write("\x1b[2K\x1b[0G" + this.inputBuffer); // 清除当前行并显示输入缓冲
          } else {
            terminal.write("\x1b[2K\x1b[0G" + this.commandHistory[this.historyIndex]); // 清除当前行并显示历史命令
            this.inputBuffer = this.commandHistory[this.historyIndex]; // 更新输入缓冲
          }
        }
      } else {
        this.inputBuffer += data; // 将用户输入的字符添加到缓冲中
        terminal.write(data); // 在终端上显示用户输入的字符
      }
    });
  },
  methods: {
    send(data) {
      this.ws.send(JSON.stringify(data))
    },
    resizeScreen() {
      try {
        terminal.fit()
      } catch (e) {
        console.error(e)
      }
    }
  },
  watch: {}
}
</script>

<template>
  <v-sheet height="800px" width="100%">
    <div id="terminal" ref="terminal"></div>
  </v-sheet>
</template>

<style scoped>

</style>
