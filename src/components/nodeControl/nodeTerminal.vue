<script>
import {Terminal} from "@xterm/xterm";
import {FitAddon} from "xterm-addon-fit";
import "@xterm/xterm/css/xterm.css";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";
import TerminalLogin from "@/components/nodeControl/terminalLogin.vue";
import message from "@/scripts/utils/message";

let terminal;
let fitAddon;

export default {
  name: "nodeTerminal",
  components: {
    TerminalLogin,
    NodeOfflineOverlay,
  },
  props: {
    ws: {
      type: Object,
      required: true
    },
    node_uuid: {
      type: String,
      required: true
    },
    online: {
      type: Boolean,
      required: true
    },
    os: {
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      resend: '',
      terminal_login: false
    };
  },
  mounted() {
    // 检查系统，如果是Windows则直接将登录状态设为True，然后初始化终端并等待终端就绪
    if (this.os === "Windows") {
      this.send({
        action: 'terminal:login',
        data: {}
      })
      this.terminal_login = true
    }
    this.init()
    this.handle_websocket_message()
  },
  methods: {
    init() {
      /**
       * 初始化终端
       */
      terminal = new Terminal({
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
      });
      fitAddon = new FitAddon();
      terminal.loadAddon(fitAddon);
      terminal.open(this.$refs.terminal);
    },
    ready() {
      /**
       * 终端就绪
       */
      window.addEventListener('resize', this.resize);
      terminal.onKey(({key}) => {
        this.input(key);
      });

      terminal.element.addEventListener('compositionend', (event) => {
        this.input(event.data);
      });
      document.addEventListener('keydown', (e) => {
        // 复制事件
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
          document.execCommand('copy');
          e.preventDefault();
        }
        // 粘贴事件
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyV') {
          navigator.clipboard.readText().then((text) => {
            this.input(text);
          });
          e.preventDefault();
        }
      });
    },
    handle_websocket_message() {
      /**
       * 处理WebSocket消息
       * @param event
       */
      this.ws.onmessage = (event) => {
        let data = null;
        try {
          data = JSON.parse(event.data);
        } catch (e) {
          console.error(e);
          this.showError(`JSON数据解析失败：${e.message}`);
          return;
        }
        switch (data.action) {
          case "terminal:output":
            terminal.write(data.data);
            break;
          case "terminal:ready":
            this.terminal_login = true
            this.ready()
            break
          case "terminal:login_failed":
            message.showError(this, "终端登录失败，请重新尝试")
        }
      };
    },
    resize() {
      fitAddon.fit();
      this.send({
        action: 'terminal:resize',
        data: {
          cols: terminal.cols,
          rows: terminal.rows
        }
      });
    },
    input(key) {
      this.send({
        action: 'terminal:input',
        data: key
      });
    },
    send_line() {
      this.input(this.resend + "\r")
      this.resend = '';
    },
    send(data) {
      this.ws.send(JSON.stringify(data));
    },
  },
};
</script>

<template>
  <v-sheet height="75vh" max-height="800px" width="100%">
    <node-offline-overlay :flag="!online"/>
    <div class="terminal_box" v-show="terminal_login && online">
      <div id="terminal" ref="terminal"></div>
      <v-row class="terminal_input_bar d-flex align-center">
        <v-col cols="max">
          <v-text-field
            clearable
            label="在此处键入命令"
            v-model="resend"
            hide-details
          >
          </v-text-field>
        </v-col>
        <v-col cols="2">
          <v-btn
            prepend-icon="$vuetify"
            variant="tonal"
            @click="send_line">
            发送
          </v-btn>
        </v-col>
      </v-row>
    </div>
    <div class="terminal-login" v-show="!terminal_login && online">
      <terminalLogin :ws="ws"></terminalLogin>
    </div>
  </v-sheet>
</template>

<style scoped>
@font-face {
  font-family: 'NotoSansSC-Medium';
  src: url('@/assets/fonts/NotoSansSC-Medium.otf');
}

#terminal {
  font-family: 'NotoSansSC-Medium', 'Courier New', Courier, monospace;
  font-size: 16px;
  line-height: 1.5;
  background-color: #272822;
  color: #F8F8F2;
}

.terminal_box {
  height: 100%;

  #terminal {
    height: calc(100% - 80px);
  }

  .terminal_input_bar {
    margin-top: 10px;
    height: 80px;
  }
}

.terminal-login {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
