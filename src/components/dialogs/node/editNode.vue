<script>
import InputTag from "@/components/input/inputTag.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import node_tags from "@/scripts/apis/node_tags";
import node_manager from "@/scripts/apis/node_manager";
import node_group from "@/scripts/apis/node_group";

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
      name: "",
      desc: "",
      tags: [],
      group: null,
      tag_items: [],
      groupListData: []
    }
  },
  methods: {
    search_tag(tag_name) {
      if (tag_name) {
        node_tags.search_tag(tag_name).then(res => {
          this.tag_items = res.data.data.tags
        })
      }
    },
    load_node_info() {
      node_manager.get_node_info(this.uuid).then(res => {
        const data = res.data.data
        this.name = data.node_name
        this.desc = data.node_desc
        this.tags = data.node_tags
        this.group = data.node_group
        console.log(this.tags)
      })
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
      this.$emit('close')
    },
    submit() {
      if (!this.name) {
        return message.showWarning(this, "节点名未填写")
      }
      console.log(this.group?.group_id)
      node_manager.edit_node(
        this.uuid,
        this.name,
        this.desc,
        this.tags,
        this.group?.group_id,
      ).then(() => {
        message.showSuccess(this, "设置已保存")
        this.$emit('success')
        this.close()
      })
    }
  },
  watch: {
    flag(val) {
      if (val) {
        this.load_node_info()
        this.load_node_group()
      } else {
        this.name = ""
        this.desc = ""
        this.tags = []
        this.group = null
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
          <v-text-field type="text" v-model="name"></v-text-field>
        </div>
        <div>
          <div class="text-caption">
            节点标签
          </div>
          <input-tag
            label="节点标签"
            :value="tags"
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
            v-model="group"
            auto-select-first
            return-object
            clearable
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
          <v-textarea v-model="desc"></v-textarea>
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
