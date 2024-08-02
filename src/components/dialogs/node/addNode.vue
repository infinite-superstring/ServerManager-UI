<script>
import InputTag from "@/components/input/inputTag.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import {debounce} from '@/scripts/utils/debounce.js'
import node_manager from "@/scripts/apis/node_manager";
import node_tags from "@/scripts/apis/node_tags";
import node_group from "@/scripts/apis/node_group";

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
        node_tags.search_tag(tag_name).then(res => {
          this.tag_items = res.data.data.tags
        })
      }
    },
    load_node_group(search = "") {
      node_group.get_node_group_list(search).then((res) => {
        this.groupListData = res.data.data.PageContent.map((({group_id, group_name}) => ({group_id, group_name})))
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
      node_manager.add_node(
        this.nodeName,
        this.description,
        this.tags,
        this.group,
      ).then(res => {
        this.$emit('success', {
          token: res.data.data.token,
          serverToken: res.data.data.server_token
        })
        this.close()
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
