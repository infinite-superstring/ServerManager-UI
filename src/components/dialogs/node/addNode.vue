<script>
import InputTag from "@/components/input/inputTag.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import {debounce} from '@/scripts/utils/debounce.js'

export default {
  name: "addNode",
  components: {InputTag},
  props: {
    flag: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close', 'success'],
  data() {
    return {
      nodeName: null,
      description: null,
      tags: [],
      tag_items: [],
      group: null,
      /*搜索防抖*/
      debounce_search_tag: debounce(this.search_tag, 500),
      groupListData: null
    }
  },
  mounted() {
    this.load_node_group()
  },
  methods: {
    search_tag(tag_name) {
      if (tag_name) {
        axios.post("/api/node_manager/node_tag/search_tag", {tag: tag_name}).then(res => {
          const apiStatus = res.data.status
          if (apiStatus === 1) {
            this.tag_items = res.data.data.tags
          } else {
            return message.showError(this, res.data.msg)
          }
        }).catch(err => {
          console.log(err)
          return message.showApiErrorMsg(this, err.message)
        })
      }
    },
    load_node_group(search = "") {
      axios.post('/api/node_manager/node_group/getGroupList', {
        page: 1,
        search: search
      }).then((res) => {
        if (res.data.status === 1) {
          this.maxPage = res.data.data.maxPage
          this.currentPage = res.data.data.currentPage
          this.groupListData = res.data.data.PageContent.map((({group_id, group_name}) => ({group_id, group_name})))
        } else {
          message.error(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(this, err.message)
      })
    },
    open_group_manager_page() {
      let routeData = this.$router.resolve({
        name: "nodeGroupEdit"
      });
      window.open(routeData.href, '_blank');
    },
    close() {
      this.nodeName = null
      this.description = null
      this.tags = []
      this.group = null
      this.$emit('close')
    },
    submit() {
      if (!this.nodeName) {
        return message.showWarning(this, "节点名未填写")
      }
      axios.post('/api/node_manager/addNode', {
        node_name: this.nodeName,
        node_description: this.description,
        node_tags: this.tags,
        node_group: this.group
      }).then(res => {
        const status = res.data.status
        if (status !== 1) {
          return message.showError(this, res.data.msg)
        } else {
          // message.showSuccess(this, `节点添加成功,Token:${res.data.data.token}`, 10000)
          this.$emit('success', {
            token: res.data.data.token,
            serverToken: res.data.data.server_token
          })
          this.close()
        }
      }).catch(err => {
        console.error(err)
        return message.showApiErrorMsg(this, err.message)
      })
    }
  },
}
</script>

<template>
  <v-dialog
    id="inputDialog"
    activator="parent"
    min-width="600px"
    width="auto"
    persistent
    :modelValue="flag"
  >
    <v-card>
      <v-card-title>添加节点</v-card-title>
      <v-card-text>
        <v-text-field type="text" label="节点名" v-model="nodeName"></v-text-field>
        <input-tag
          label="节点标签"
          :items="tag_items"
          @update:chips="args => {tags = args}"
          @input="debounce_search_tag"
        />
        <v-autocomplete
          label="节点分组"
          @update:search="value => load_node_group(value)"
          :items="groupListData"
          item-title="group_name"
          item-value="group_id"
          v-model="group"
          auto-select-first
        >
          <template v-slot:append>
            <v-btn icon title="新增节点组" variant="plain" @click="open_group_manager_page">
              <v-icon icon="mdi:mdi-plus"/>
            </v-btn>
          </template>
        </v-autocomplete>
        <v-textarea v-model="description" label="节点备注信息"></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submit">确定</v-btn>
        <v-btn color="error" @click="close">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
