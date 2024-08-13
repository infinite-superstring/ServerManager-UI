<script>
import axios from "axios";
import node_manager from "@/scripts/apis/node_manager";
import ToolsSelectBar from "@/components/public/toolsSelectBar/ToolsSelectBar.vue";

export default {
  name: "nodeEvent",
  components: {ToolsSelectBar},
  props: {
    node_uuid: {
      type: String,
      required: true,
    }
  },
  data() {
    return {
      PageContent: [],
      currentPage: 1,
      maxPage: 1,
      info_dialog: {
        event_id: null,
        flag: false,
        data: {
          start_time: null,
          end_time: null,
          update_time: null,
          phase: [],
        }
      },
      params: {},
      options: [
        {
          prop: 'level',
          label: '事件级别',
          optional: [
            {
              label: '信息',
              value: 'Info'
            },
            {
              label: '警告',
              value: 'Warning'
            },
            {
              label: '错误',
              value: 'Error'
            },
            // {
            //   label: '致命的',
            //   value: 'Critical'
            // }
          ],
          type: 'checkbox'
        },
        {
          prop: 'dateRange',
          label: '时间',
          type: 'date-range'
        },
        {
          prop: 'status',
          label: '事件状态',
          optional: [
            {
              label: '运行时',
              value: true
            },
            {
              label: '已结束',
              value: false
            },
          ],
          type: 'radio'
        }
      ]
    }
  },
  mounted() {
    this.getEventList()
  },
  methods: {
    getEventList(page_index = 1, page_size = 20) {
      node_manager.getNodeEventListApi({
        node_uuid: this.node_uuid,
        page: page_index,
        pageSize: page_size,
        ...this.params
      }).then((response) => {
        console.log(response.data)
        if (response.data.status !== 1) {
          return
        }
        this.currentPage = response.data.data.currentPage
        this.maxPage = response.data.data.maxPage
        this.PageContent = response.data.data.PageContent
        console.log(this.PageContent)
        console.log(this.currentPage)
        console.log(this.maxPage)
      })
    }
  },
  watch: {
    "info_dialog.event_id"(newVal) {
      if (newVal) {
        axios.post('/api/node_manager/node_event/get_event_info', {
          event_id: this.info_dialog.event_id,
        }).then(response => {
          if (response.data.status !== 1) {
            this.info_dialog.flag = false
            this.info_dialog.event_uuid = null
          }
          this.info_dialog.data = response.data.data
        })
      }
    },
    currentPage(newVal) {
      this.getEventList(newVal)
    }
  }
}
</script>

<template>
  <ToolsSelectBar
    v-model="params"
    search-label="按类型搜索"
    :hide-add-button="true"
    @option:click="getEventList()"
    @search:input="getEventList()"
    :options="options"
  />
  <v-table>
    <thead>
    <tr>
      <th class="text-left">
        EventID
      </th>
      <th class="text-left">
        事件类型
      </th>
      <th class="text-left">
        事件详细信息
      </th>
      <th class="text-left">
        事件等级
      </th>
      <th class="text-left">
        最后更新时间
      </th>
      <th class="text-left">
        详细信息
      </th>
    </tr>
    </thead>
    <tbody v-if="PageContent.length > 0">
    <tr
      v-for="page_row in PageContent"
      :key="page_row.event_id"
      :class="page_row.closed ? '': 'blinking-text'"
    >
      <td>{{ page_row.event_id }}</td>
      <td>{{ page_row.type }}</td>
      <td>{{ page_row.desc ? page_row.desc : '无' }}</td>
      <td class="event_level">
        <span v-if="page_row.level === 'Info'" class="text-blue-darken-1"><v-icon
          icon="mdi-information-outline"/>信息</span>
        <span v-if="page_row.level === 'Warning'" class="text-amber-darken-1"><v-icon
          icon="mdi-alert-outline"/>警告</span>
        <span v-if="page_row.level === 'Error'" class="text-red-darken-2"><v-icon icon="mdi-alert-circle-outline"/>错误</span>
        <span v-if="page_row.level === 'Critical'" class="text-red-darken-4"><v-icon icon="mdi-alert-circle-outline"/>致命</span>
      </td>
      <td>{{ page_row.update_time }}</td>
      <td>
        <v-btn
          size="small"
          color="primary"
          variant="text"
          @click="info_dialog.event_id = page_row.event_id;info_dialog.flag=true">
          详细信息
        </v-btn>
      </td>
    </tr>
    </tbody>
  </v-table>
  <div>
    <v-dialog @close="info_dialog.event_id = null" v-model="info_dialog.flag" max-width="600px">
      <v-card>
        <v-card-title>节点事件详细信息</v-card-title>
        <v-card-text>
          事件ID: {{ info_dialog.event_id }}<br>
          事件开始时间: {{ info_dialog.data.start_time }}<br>
          事件结束时间: {{ info_dialog.data.end_time ? info_dialog.data.end_time : '未结束' }}<br>
          事件最后更新时间: {{ info_dialog.data.update_time }}<br>
          <div class="phase" v-if="info_dialog.data.phase.length > 0">
            <v-divider/>
            <v-table max-height="300px">
              <thead>
              <tr>
                <th>
                  #
                </th>
                <th>
                  步骤名
                </th>
                <th>
                  步骤数据
                </th>
                <th>
                  步骤时间
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
                v-for="(item, index) in info_dialog.data.phase"
                :key="index"
              >
                <td>{{ index }}</td>
                <td>{{ item.title }}</td>
                <td>{{ item.desc }}</td>
                <td>{{ item.timestamp }}</td>
              </tr>
              </tbody>
            </v-table>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="info_dialog.flag = false">
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
  <v-pagination
    v-model="currentPage"
    v-if="maxPage > 1"
    :length="maxPage"
    :total-visible="6"
    prev-icon="mdi:mdi-menu-left"
    next-icon="mdi:mdi-menu-right"
    rounded="circle"
  ></v-pagination>
</template>

<style scoped>
.event_level span {
  display: flex;
  align-items: center;
}

@keyframes blink {
  0% {
    background-color: #42A5F5;
    color: white
  }
  50% {
    background-color: unset;
    color: black
  }
  100% {
    background-color: #42A5F5;
    color: white
  }
}

.blinking-text {
  animation: blink 3s infinite;
}
</style>
