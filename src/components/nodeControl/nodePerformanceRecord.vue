<script>
import cpu_performance_record from "@/components/charts/node/performance_record/cpu_performance_record.vue"
import memory_performance_record from "@/components/charts/node/performance_record/memory_performance_record.vue";
import calculate from "@/scripts/utils/calculate";
import disk_io_performance_record from "@/components/charts/node/performance_record/disk_io_performance_record.vue";
import loadavg_performance_record from "@/components/charts/node/performance_record/loadavg_performance_record.vue";
import format from "@/scripts/utils/format";
import network_performance_record from "@/components/charts/node/performance_record/network_performance_record.vue";
import {da} from "vuetify/locale";

export default {
  name: "nodePerformanceRecord",
  components: {
    network_performance_record,
    loadavg_performance_record,
    disk_io_performance_record,
    memory_performance_record,
    cpu_performance_record
  },
  props: {
    ws: {
      type: WebSocket,
      required: true,
    }
  },
  data() {
    return {
      pre: false,
      select_network_port: "_all",
      network_port_list: [],
      cpu: {
        start_time: "",
        end_time: "",
        labels: [],
        datasets: [],
      },
      memory: {
        start_time: "",
        end_time: "",
        labels: [],
        source_data: [],
        datasets: [],
      },
      disk_io: {
        start_time: "",
        end_time: "",
        labels: [],
        datasets: []
      },
      network: {
        start_time: "",
        end_time: "",
        source_data: [],
        labels: [],
        datasets: []
      },
      loadavg: {
        start_time: "",
        end_time: "",
        labels: [],
        datasets: []
      },
    }
  },
  mounted() {
    this.send({
      action: 'load_performance_record'
    })
    this.ws.onmessage = (message) => {
      let data = null
      try {
        data = JSON.parse(message.data)
      } catch (e) {
        console.error(e)
        message.showError(this, `JSON数据解析失败：${e.message}`)
      }
      switch (data.action) {
        case "load_performance_record": {
          this.load_performance_record(data.data)
        }
      }
    }
  },
  methods: {
    send(data) {
      return this.ws.send(JSON.stringify(data))
    },
    load_performance_record(data) {
      const usage_data = data.usage_data
      if (data.device === "_all" || data.device === "cpu") {
        this.cpu.start_time = data.start_time
        this.cpu.end_time = data.end_time
        // 提取时间戳作为X轴标签
        this.cpu.labels = usage_data.map(entry => entry.timestamp);

        // 准备 cpu_usage 的数据集
        const cpuUsageDataset = {
          label: 'CPU',
          data: usage_data.map(entry => entry.cpu_usage),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        };

        // 准备每个核心的使用率数据集
        const coreUsageDatasets = [];
        const coreCount = usage_data[0].cpu_cores_usage.length;
        for (let i = 0; i < coreCount; i++) {
          const coreDataset = {
            label: `CPU ${i}`,
            data: usage_data.map(entry => entry.cpu_cores_usage[i].usage),
            fill: false,
            hidden: true,
            pointRadius: 0,
            tension: 0.1
          };
          coreUsageDatasets.push(coreDataset);
        }

        // 合并所有数据集
        this.cpu.datasets = [cpuUsageDataset, ...coreUsageDatasets];
      }
      if (data.device === "_all" || data.device === "memory") {
        this.memory.start_time = data.start_time
        this.memory.end_time = data.end_time
        // 提取时间戳作为X轴标签
        this.memory.labels = usage_data.map(entry => entry.timestamp);

        this.memory.source_data = usage_data.map(entry => entry.memory_used);

        this.memory.datasets = [{
          label: "内存使用率",
          data: usage_data.map(entry => calculate.calculate_percentage(entry.memory_used, entry.memory_total)),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        }]
      }
      if (data.device === "_all" || data.device === "disk_io") {
        this.disk_io.start_time = data.start_time
        this.disk_io.end_time = data.end_time
        this.disk_io.labels = usage_data.map(entry => entry.timestamp);
        this.disk_io.datasets = [{
          label: "读取",
          data: usage_data.map(entry => entry.disk_io_read_bytes),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        }]
        this.disk_io.datasets.push({
          label: "写入",
          data: usage_data.map(entry => entry.disk_io_write_bytes),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        })
      }
      if (data.device === "_all" || data.device === "network") {
        this.network.start_time = data.start_time
        this.network.end_time = data.end_time
        this.network_port_list = []
        for (let i = 0; i < usage_data[0].network_usage.length; i++) {
          this.network_port_list.push(usage_data[0].network_usage[i].name)
        }
        this.network.labels = usage_data.map(entry => entry.timestamp);
        this.network.source_data = usage_data.map(entry => entry.network_usage)
        this.load_network_port_data()
      }
      if (data.device === "_all" || data.device === "loadavg") {
        this.loadavg.start_time = data.start_time
        this.loadavg.end_time = data.end_time
        this.loadavg.labels = usage_data.map(entry => entry.timestamp);
        this.loadavg.datasets = [{
          label: "1分钟",
          data: usage_data.map(entry => format.formatPercentage((entry.system_loadavg.one_minute / entry.system_loadavg.processor_count) * 100)),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        }]
        this.loadavg.datasets.push({
          label: "5分钟",
          data: usage_data.map(entry => format.formatPercentage((entry.system_loadavg.five_minute / entry.system_loadavg.processor_count) * 100)),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        })
        this.loadavg.datasets.push({
          label: "15分钟",
          data: usage_data.map(entry => format.formatPercentage((entry.system_loadavg.fifteen_minute / entry.system_loadavg.processor_count) * 100)),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        })
      }
      console.log(this.cpu)
      console.log(this.memory)
      console.log(this.disk_io)
      console.log(this.network)
      console.log(this.loadavg)
      this.pre = true
    },
    load_network_port_data() {
      const network_port_data = this.network.source_data.map(entry => {
        const allInterface = entry.find(item => item.name === this.select_network_port);
        return {
          bytes_sent: allInterface.bytes_sent,
          bytes_recv: allInterface.bytes_recv
        };
      });
      this.network.datasets = [
        {
          label: "发送",
          data: network_port_data.map(item => item.bytes_sent),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        },
        {
          label: "接收",
          data: network_port_data.map(item => item.bytes_recv),
          fill: true,
          pointRadius: 0,
          tension: 0.1
        }
      ]
    },
    change_time(type) {
      let data = {}
      switch (type) {
        // 平均负载
        case 'loadavg':
          data = {
            start_time: this.$refs.loadavg_start_time.value,
            end_time: this.$refs.loadavg_end_time.value,
            device: "loadavg",
          }
          break;
        // CPU负载
        case 'cpu':
          data = {
            start_time: this.$refs.cpu_start_time.value,
            end_time: this.$refs.cpu_end_time.value,
            device: "cpu",
          }
          break;
        case 'memory':
          data = {
            start_time: this.$refs.memory_start_time.value,
            end_time: this.$refs.memory_end_time.value,
            device: "memory",
          }
          break;
        case 'disk_io':
          data = {
            start_time: this.$refs.disk_io_start_time.value,
            end_time: this.$refs.disk_io_end_time.value,
            device: "disk_io",
          }
          break;
        case 'network':
          data = {
            start_time: this.$refs.network_start_time.value,
            end_time: this.$refs.network_end_time.value,
            device: "network",
          }
          break
      }
      console.log(data)
      this.send({
        action: 'get_performance_record',
        data: data
      })
      if (type === 'network'){
        this.load_network_port_data()
      }
    }
  },
  watch: {
    select_network_port(val) {
      this.load_network_port_data()
    }
    //   "cpu.start_time"(val) {
    //     if (this.pre && val != this.cpu.start_time_time) {
    //       this.send({
    //         action: 'get_performance_record',
    //         data: {
    //           start_time: val,
    //           end_time: this.cpu.end_time,
    //           device: "cpu",
    //         }
    //       })
    //     }
    //   },
    //   "cpu.end_time"(val) {
    //     if (this.pre && val != this.cpu.end_time) {
    //       this.send({
    //         action: 'get_performance_record',
    //         data: {
    //           start_time: this.cpu.start_time,
    //           end_time: val,
    //           device: "cpu",
    //         }
    //       })
    //     }
    //   },
    //   "memory.start_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "memory.end_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "disk_io.start_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "disk_io.end_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "network.start_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "network.end_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "loadavg.start_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   },
    //   "loadavg.end_time"(val) {
    //     if (this.pre) {
    //
    //     }
    //   }
  }
}
</script>

<template>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          平均负载
          <div class="select-time">
            <input ref="loadavg_start_time" @change="change_time('loadavg')" type="datetime-local"
                   v-model="loadavg.start_time">
            <span>到</span>
            <input ref="loadavg_end_time" @change="change_time('loadavg')" type="datetime-local"
                   v-model="loadavg.end_time">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
            <loadavg_performance_record
              :labels="loadavg.labels"
              :datasets="loadavg.datasets"
            />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          CPU
          <div class="select-time">
            <input ref="cpu_start_time" @change="change_time('cpu')" type="datetime-local" v-model="cpu.start_time">
            <span>到</span>
            <input ref="cpu_end_time" @change="change_time('cpu')" type="datetime-local" v-model="cpu.end_time">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
            <cpu_performance_record
              :datasets="cpu.datasets"
              :labels="cpu.labels"
            />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          内存
          <div class="select-time">
            <input ref="memory_start_time" @change="change_time('memory')" type="datetime-local" v-model="memory.start_time">
            <span>到</span>
            <input ref="memory_end_time" @change="change_time('memory')" type="datetime-local" v-model="memory.end_time">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
            <memory_performance_record
              :labels="memory.labels"
              :datasets="memory.datasets"
              :source_data="memory.source_data"
            />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
  <v-row>
    <v-col>
      <v-card>
        <v-card-title>
          磁盘IO
          <div class="select-time">
            <input ref="disk_io_start_time" @change="change_time('disk_io')" type="datetime-local" v-model="disk_io.start_time">
            <span>到</span>
            <input ref="disk_io_end_time" @change="change_time('disk_io')" type="datetime-local" v-model="disk_io.end_time">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
            <disk_io_performance_record
              :labels="disk_io.labels"
              :source_data="[]"
              :datasets="disk_io.datasets"
            />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
    <v-col>
      <v-card>
        <v-card-title>
          <p class="network_card_select">
            网络吞吐
            <v-menu
              :close-on-content-click="false"
            >
              <template v-slot:activator="{ props }">
                <v-btn v-bind="props" variant="text" color="primary" size="small">
                  {{ select_network_port }}
                </v-btn>
              </template>
              <v-select
                width="250px"
                label="网卡"
                :items="network_port_list"
                v-model="select_network_port"
              ></v-select>
            </v-menu>
          </p>
          <div class="select-time">
            <input ref="network_start_time" @change="change_time('network')" type="datetime-local" v-model="network.start_time">
            <span>到</span>
            <input ref="network_end_time" @change="change_time('network')" type="datetime-local" v-model="network.end_time">
          </div>
        </v-card-title>
        <v-card-text>
          <v-sheet height="300px">
            <network_performance_record
              :labels="network.labels"
              :datasets="network.datasets"
            />
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<style scoped>
.v-card-title {
  display: flex;
  justify-content: space-between;
  font-size: 16px;

  .network_card_select {
    display: flex;
    align-items: center;
    flex-direction: row;
  }

  div {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    width: 45%;
    min-width: 300px;
    font-size: 14px;

    input {
      width: 35%;
      min-width: 120px;
      max-width: 140px;
    }

    span {
      margin: 0 5px;
    }
  }
}

.select-time {
  width: 100%;
}
</style>
