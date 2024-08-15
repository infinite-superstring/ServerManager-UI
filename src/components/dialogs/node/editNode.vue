<script>
import InputTag from "@/components/input/inputTag.vue";
import axios from "axios";
import message from "@/scripts/utils/message";
import node_tags from "@/scripts/apis/node_tags";
import node_manager from "@/scripts/apis/node_manager";
import node_group from "@/scripts/apis/node_group";
import SelectAuthRestrictionsMethod from "@/components/input/selectAuthRestrictionsMethod.vue";
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";

export default {
  name: "editNode",
  components: {SelectNodeGroup, SelectAuthRestrictionsMethod, InputTag},
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
      auth_restrictions: {
        enable: false,
        method: 1,
        value: null
      },
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
        this.auth_restrictions = data.auth_restrictions
        console.log(data.auth_restrictions)
        console.log(this.tags)
      })
    },
    load_node_group(search = "") {
      node_group.get_node_group_list(search).then((res) => {
        this.groupListData = res.data.data.PageContent.map((({group_id, group_name}) => ({group_id, group_name})))
      })
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
        this.auth_restrictions
      ).then(() => {
        message.showSuccess(this, "节点信息保存成功")
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
        this.auth_restrictions = {
          enable: false,
          method: 1,
          value: null
        }
      }
    }
  },
  computed: {
    auth_restrictions_method_msg() {
      switch (this.auth_restrictions.method) {
        case 1:
          return "允许的IP地址段（如：192.168.1.0/24）"
        case 2:
          return "允许的IP地址（如192.168.1.1）"
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
      <v-card-title>编辑节点</v-card-title>
      <v-card-text>

        <v-text-field
          type="text"
          label="节点名" v-model="name"
        />
        <input-tag
          label="节点标签"
          @update="value => tags = value"
        />
        <select-node-group
          @update="value => group = value"
          add_group
        />
        <v-textarea
          v-model="desc"
          label="节点备注信息"
        />
        <v-divider/>
        <p>登录安全设置</p>
        <v-switch
          label="启用节点登录限制"
          v-model="auth_restrictions.enable"
          color="primary"
          hide-details
        />
        <div v-if="auth_restrictions.enable">
          <select-auth-restrictions-method
            :value="auth_restrictions.method"
            @update="args => auth_restrictions.method = args"
          />
          <v-text-field
            v-model="auth_restrictions.value"
            :label="auth_restrictions_method_msg"
          />
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
