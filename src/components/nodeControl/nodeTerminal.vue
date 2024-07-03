<script>
import {Terminal} from "xterm";
import {FitAddon} from "xterm-addon-fit";
import "xterm/css/xterm.css";
import NodeOfflineOverlay from "@/components/nodeControl/nodeOfflineOverlay.vue";
import TerminalLogin from "@/components/nodeControl/terminalLogin.vue";

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
    os:{
      type: String,
      required: true
    }
  },
  data: () => {
    return {
      resend: '',
      terminal_ready: false
    };
  },
  mounted() {
    if (this.os==="Windows"){
      this.terminal_ready=true
      this.windows_login()
      this.open_terminal()
    }
    console.log(this.os,this.terminal_ready)
    if (!this.terminal_ready){
      this.check_login();
    }
  },
  beforeUnmount() {
    this.send({
      action: 'terminal:close'
    });
  },
  methods: {
    open_terminal() {
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
      window.addEventListener('resize', this.resize);
      // eslint-disable-next-line vue/no-mutating-props
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
        }
      };

      terminal.onKey(({key}) => {
        this.input(key);
      });
      terminal.element.addEventListener('compositionend', (event) => {
        const text = event.data;
        this.input(text);
      });

      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.code === 'KeyC') {
          document.execCommand('copy');
          e.preventDefault();
        }

        if (e.ctrlKey && e.shiftKey && e.code === 'KeyV') {
          navigator.clipboard.readText().then((text) => {
            this.input(text);
          });
          e.preventDefault();
        }
      });
    },
    check_login() {
      // eslint-disable-next-line vue/no-mutating-props
      this.ws.onmessage = (event) => {
        let data = null;
        try {
          data = JSON.parse(event.data);
          console.log(data.action)
        } catch (e) {
          console.error(e);
          this.showError(`JSON数据解析失败：${e.message}`);
          return;
        }
        if (data.action === "terminal:ready") {
          if (data.data) {
            this.open_terminal();
            console.log(data.data)
            this.terminal_ready=data.data
          }
        }
      };
    },
    windows_login(){
      this.send({
        action: 'terminal:login',
        data:{
          'host':1,
          'port':1,
          'username':1,
          'password':1,
        }
      })
    },
    resize() {
      fitAddon.fit();
      const cols = Math.floor(this.$refs.terminal.offsetWidth / 11);
      // const cols = 20
      const rows = Math.floor(this.$refs.terminal.offsetHeight / 18);
      // const rows = 20
      this.send({
        action: 'terminal:resize',
        data: {
          cols: cols,
          rows: rows
        }
      });
    },
    input(key) {
      this.send({
        action: 'terminal:input',
        data: key
      });
    },
    input_end() {
      this.send({
        action: 'terminal:input',
        data: this.resend
      });
      this.resend = '';
    },
    send(data) {
      this.ws.send(JSON.stringify(data));
    },
    showError(message) {
      console.error(message);
    }
  },
};
</script>

<template>
  <v-sheet height="75vh" max-height="800px" width="100%">
    <node-offline-overlay :flag="!online"/>
    <div style="height: 100%; width: 100%; " v-show="terminal_ready">
        <div id="terminal" ref="terminal" style="height: 85%" ></div>
        <div style="display: flex; padding: 10px; height: 15%; width: 100%">
          <v-text-field clearable label="在此处键入命令" variant="outlined" style="flex: 0.80; height: 20%" v-model="resend"></v-text-field>
          <div style="flex: 0.025"></div>
          <v-btn prepend-icon="$vuetify" variant="tonal" style="flex: 0.15; height: 80%" @click="input_end">发送</v-btn>
          <div style="flex: 0.025"></div>
        </div>
    </div>
      <div style="width:100%;height: 100%" v-show="!terminal_ready">
        <terminalLogin :ws="ws"></terminalLogin>
      </div>
  </v-sheet>
</template>

<style scoped>
@font-face {
  font-family: 'NotoSansSC-Medium';
  src: url('/public/fonts/NotoSansSC-Medium.otf');
}

#terminal {
  font-family: 'NotoSansSC-Medium', 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #272822;
  color: #F8F8F2;
}
</style>
