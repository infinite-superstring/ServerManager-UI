<script>
import {Terminal} from "@xterm/xterm";

import("@xterm/xterm/css/xterm.css")

let terminal

export default {
  name: "ClusterExecution",
  data() {
    return {
      result_list: [
        {
          result_id: 1,
          time: "",
          command: "ls -a",
        },
        {
          result_id: 2,
          time: "",
          command: "tree",
        },
        {
          result_id: 3,
          time: "",
          command: "ping 127.0.0.1",
        }
      ]
    }
  },
  mounted() {
    terminal = new Terminal({
      // disableStdin: true
      rows: 40, //行数
      cols: 100, // 不指定行数，自动回车后光标从下一行开始
      convertEol: true, //启用时，光标将设置为下一行的开头
    });
    terminal.open(this.$refs.terminal)
  }
}
</script>

<template>
  <v-card title="集群命令" class="pageMain-card">
    <v-card-text>
      <v-row>
        <v-col cols="4">
          <v-card title="运行器">
            <v-card-text>
              <v-row>
                <v-col>
                  <v-select label="节点组"></v-select>
                </v-col>
                <v-col>
                  <v-text-field label="执行目录"></v-text-field>
                </v-col>
              </v-row>
              <v-textarea label="Shell"></v-textarea>
            </v-card-text>
            <v-card-actions>
              <v-btn>执行</v-btn>
            </v-card-actions>
          </v-card>
          <v-divider/>
          <v-card
            title="结果列表">
            <v-list
              density="compact"
            >
              <v-list-item
                v-for="item in result_list"
                :key="item.result_id"
                :title="item.time"
                variant="plain"
              >
                {{ item.command }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col>
          <v-card title="执行结果">
            <v-card-text height="600px">
              <v-select label="节点"></v-select>
              <v-sheet width="100%">
                <div id="terminal" ref="terminal"></div>
              </v-sheet>
            </v-card-text>
            <v-card-actions>
              <v-btn>清空</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
