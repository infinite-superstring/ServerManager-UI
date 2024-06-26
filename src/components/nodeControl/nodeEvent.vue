<script>
import axios from "axios";

export default {
  name: "nodeEvent",
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
      }
    }
  },
  mounted() {
    this.getEventList()
  },
  methods: {
    getEventList(page_index = 1, page_size = 20) {
      axios.post('/api/node_manager/node_event/get_node_events', {
        node_uuid: this.node_uuid,
        page: page_index,
        pageSize: page_size
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
    >
      <td>{{ page_row.event_id }}</td>
      <td>{{ page_row.type }}</td>
      <td>{{ page_row.desc ? page_row.desc : '未知' }}</td>
      <td>{{ page_row.level }}</td>
      <td>{{ page_row.update_time }}</td>
      <td>
        <v-btn size="small" color="primary" variant="text"
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
            <v-stepper-vertical>
              <v-stepper-vertical-item
                v-for="(index, item) in info_dialog.data.phase"
                :key="index"
                :complete="item > 1"
                :title="item.title"
                value="index"
              >
                {{ item.desc }}
                <template v-slot:next="{ next }">
                  <v-btn color="primary" @click="next"></v-btn>
                </template>

                <template v-slot:prev></template>
              </v-stepper-vertical-item>
            </v-stepper-vertical>
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

</style>
