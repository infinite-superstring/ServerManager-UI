<script>
import InputTag from "@/components/input/inputTag.vue";
import axios from "axios";
import message from "@/scripts/utils/message";

export default {
  name: "editNode",
  components: {InputTag},
  props: {
    uuid: {
      type: String,
      required: true,
    },
    flag: {
      type: Boolean,
      required: true,
    }
  },
  data: () => {
    return {
      node_name: "",
      node_desc: "",
      node_tags: [],
      node_group: null,
      tag_items: [],
      groupListData: []
    }
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
    load_node_info() {
      axios.post('/api/node_manager/getNodeInfo', {
        uuid: this.uuid,
      }).then(res => {
        const status = res.data.status
        if (status !== 1) {
          return message.showError(this, res.data.msg)
        } else {
          const data = res.data.data
          this.node_name = data.node_name
          this.node_desc = data.node_desc
          this.node_tags = data.node_tags
          this.group = data.node_group
        }
      }).catch(err => {
        console.error(err)
        return message.showApiErrorMsg(this, err.message)
      })
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
      this.$emit('close')
    },
    submit() {
      if (!this.node_name) {
        return message.showWarning(this, "节点名未填写")
      }
      axios.post('/api/node_manager/editNode', {
        node_uuid: this.uuid,
        node_name: this.node_name,
        node_description: this.node_desc,
        node_tags: this.node_tags,
        node_group: this.node_group
      }).then(res => {
        const status = res.data.status
        if (status !== 1) {
          return message.showError(this, res.data.msg)
        } else {
          this.$emit('success', res.data.data.token)
          this.close()
        }
      }).catch(err => {
        console.error(err)
        return message.showApiErrorMsg(this, err.message)
      })
    }
  },
  watch: {
    flag(val) {
      if (val) {
        this.load_node_info()
        this.load_node_group()
      } else {
        this.node_name = ""
        this.node_desc = ""
        this.node_tags = []
        this.node_group = null
      }
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
      <v-card-title>编辑节点</v-card-title>
      <v-card-text>
        <div>
          <div class="text-caption">
            节点名
          </div>
          <v-text-field type="text" v-model="node_name"></v-text-field>
        </div>
        <div>
          <div class="text-caption">
            节点标签
          </div>
          <input-tag
            label=""
            :items="tag_items"
            :tags="node_tags"
            @update:chips="args => {node_tags = args}"
            @input="args => {search_tag(args)}"
          />
        </div>
        <div>
          <div class="text-caption">
            节点分组
          </div>
          <v-autocomplete
            @update:search="value => load_node_group(value)"
            :items="groupListData"
            item-title="group_name"
            item-value="group_id"
            v-model="node_group"
            auto-select-first
          >
            <template v-slot:append>
              <v-btn icon title="新增节点组" variant="plain" @click="open_group_manager_page">
                <v-icon icon="mdi:mdi-plus"/>
              </v-btn>
            </template>
          </v-autocomplete>
        </div>
        <div>
          <div class="text-caption">
            节点备注
          </div>
          <v-textarea v-model="node_desc"></v-textarea>
        </div>
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
