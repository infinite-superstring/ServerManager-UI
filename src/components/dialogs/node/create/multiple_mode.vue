<script>
import InputTag from "@/components/input/inputTag.vue";
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";
import SelectAuthRestrictionsMethod from "@/components/input/selectAuthRestrictionsMethod.vue";
import UploadFiles from "@/components/input/uploadFiles.vue";

export default {
  name: "add_node__multiple_mode",
  computed: {

  },
  components: {UploadFiles, SelectAuthRestrictionsMethod, SelectNodeGroup, InputTag},
  data() {
    return {
      results: [
        {
          node_name: "",  // 节点名
          node_tags: [],  // 节点标签列表
          node_desc: "",  // 节点简介
          node_group: {  // 节点组
            group_id: 1,  // 节点组id
            group_name: ""  // 节点组名
          },
          auth_restrictions: {  // 认证限制
            enable: true,  // 启用认证限制
            method: 1,  // 认证限制方法
            value: null  // 认证限制值
          }
        }
      ]
    }
  },
  methods: {
    auth_restrictions_method(method) {
      switch (method) {
        case 1:
          return "IP地址段"
        case 2:
          return "IP地址"
        case 3:
          return "MAC地址"
        default:
          return "未知"
      }
    }
  }
}
</script>

<template>
  <v-sheet min-width="1400px" width="90vw">
    <p class="download_template">
      <v-icon color="primary">mdi-download</v-icon>
      <a href="/api/node_manager/download_node_list_template">下载节点列表模板</a>
    </p>
    <upload-files
      label="请上传要添加的节点列表"
      upload_button_text="上传并解析"
      base_url="#"
      prepend_icon="mdi-table-arrow-up"
    />
    <v-card class="pa-3">
      <v-card-title>
        解析结果
      </v-card-title>
      <v-card-text>
        <v-table>
          <thead>
          <tr>
            <th class="text-left">
              节点名
            </th>
            <th class="text-left">
              节点标签
            </th>
            <th class="text-left">
              节点备注
            </th>
            <th class="text-left">
              集群
            </th>
            <th class="text-left">
              使能登录限制
            </th>
            <th class="text-left">
              登录限制方法
            </th>
            <th class="text-left">
              登录限制值
            </th>
          </tr>
          </thead>
          <tbody>
          <tr
            v-for="node_item in results"
            :key="node_item"
          >
            <td>
              {{ node_item.node_name }}
              <p v-if="!node_item.node_name" class='error'>未填写</p>
            </td>
            <td>
              <v-chip-group v-if="node_item.node_tags.length > 0">
                <v-chip v-for="tag in node_item.node_tags" :key="tag">{{ tag }}</v-chip>
              </v-chip-group>
              <p v-else>无</p>
            </td>
            <td>
              {{ node_item.node_desc ? node_item.node_desc : "无" }}
            </td>
            <td>
              {{ node_item.node_group.name }} (gid:{{ node_item.node_group.group_id }})
            </td>
            <td>
              <v-checkbox v-model="node_item.auth_restrictions.enable" color="primary" disabled hide-details/>
            </td>
            <td>
              {{ auth_restrictions_method(node_item.auth_restrictions.method) }}
            </td>
            <td>
              {{ node_item.auth_restrictions.value }}
              <p v-if="!node_item.auth_restrictions.value" :class='node_item.auth_restrictions.enable ? "error" : ""'>未填写</p>
            </td>
          </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
  </v-sheet>
</template>

<style scoped>
.download_template {
  margin-bottom: 15px;
}
.error {
  color: red;
  text-decoration: underline red;
}
</style>
