<script>
import InputTag from "@/components/input/inputTag.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import {debounce} from '@/scripts/utils/debounce.js'
import node_manager from "@/scripts/apis/node_manager";
import node_tags from "@/scripts/apis/node_tags";
import node_group from "@/scripts/apis/node_group";
import UploadFiles from "@/components/input/uploadFiles.vue";
import validate from "@/scripts/utils/validate";

export default {
  name: "addNode",
  components: {UploadFiles, InputTag},
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
      groupListData: null,
      auth_restrictions: {
        enable: false,
        method: 1,
        value: null
      },
      tab: "0"
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
      if (this.auth_restrictions.enable) {
        const auth_restrictions = this.auth_restrictions
        if (!auth_restrictions.method) return message.showWarning(this, "节点认证限制方法未填写")
        if (!auth_restrictions.value) return message.showWarning(this, "节点认证限制值未填写")
        switch (auth_restrictions.method) {
          case 1:
            if (!validate.validateSubnetMask(auth_restrictions.value)) return message.showWarning(this, "节点认证限制-IP地址段校验失败")
            break
          case 2:
            console.log(validate.validateIpAddress(auth_restrictions.value))
            if (!validate.validateIpAddress(auth_restrictions.value)) return message.showWarning(this, "节点认证限制-IP地址校验失败")
            break
          case 3:
            if (!validate.validate_MAC(auth_restrictions.value)) return message.showWarning(this, "节点认证限制-MAC地址校验失败")
            break
          default:
            return message.showError(this, "校验失败")
        }
      }
      node_manager.add_node(
        this.nodeName,
        this.description,
        this.tags,
        this.group,
        this.auth_restrictions
      ).then(res => {
        this.$emit('success', {
          token: res.data.data.token,
          serverToken: res.data.data.server_token
        })
        this.close()
      })
    }
  },
  computed: {
    auth_restrictions_method_msg() {
      switch (this.auth_restrictions.method) {
        case 1:
          return "允许的IP地址段"
        case 2:
          return "允许的IP地址"
        case 3:
          return "允许的MAC地址"
      }
      return ""
    }
  }
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
      <v-tabs
        v-model="tab"
        class="ma-3"
      >
        <v-tab value="0">单例模式</v-tab>
        <v-tab value="1">批量模式</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="tab">
          <v-tabs-window-item value="0">
            <v-text-field
              type="text"
              label="节点名" v-model="nodeName"
            />
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
            <v-divider/>
            <p>登录安全设置</p>
            <v-switch
              label="启用节点登录限制"
              v-model="auth_restrictions.enable"
              color="primary"
              hide-details
            />
            <div v-if="auth_restrictions.enable">
              <v-select
                label="登录限制方法"
                v-model.number="auth_restrictions.method"
                :items="[{key: '限制IP地址段', value: 1},{key: '限制IP地址', value: 2}, {key: '限制网卡MAC', value: 3}]"
                item-title="key"
                item-value="value"
              />
              <v-text-field v-model="auth_restrictions.value" :label="auth_restrictions_method_msg"/>
            </div>
          </v-tabs-window-item>

          <v-tabs-window-item value="1">
            <!--TODO-->
            <p class="download_template">
              <v-icon color="primary">mdi-download</v-icon>
              <a href="#">下载节点列表模板</a>
            </p>
            <upload-files label="请上传要添加的节点列表" base_url="#" prepend_icon="mdi-table-arrow-up"/>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submit">确定</v-btn>
        <v-btn color="error" @click="close">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.download_template {
  margin-bottom: 15px;
}
</style>
