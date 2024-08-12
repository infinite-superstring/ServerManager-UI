<script>
import InputTag from "@/components/input/inputTag.vue";
import SelectNodeGroup from "@/components/input/selectNodeGroup.vue";
import SelectAuthRestrictionsMethod from "@/components/input/selectAuthRestrictionsMethod.vue";
import UploadFiles from "@/components/input/uploadFiles.vue";

export default {
  name: "add_node__multiple_mode",
  computed: {},
  components: {UploadFiles, SelectAuthRestrictionsMethod, SelectNodeGroup, InputTag},
  data() {
    return {
      results: {
        datas: [],
        errors: [],
        error_msgs: []
      }
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
      <a href="/api/node_manager/import_node/download_template">下载节点列表模板</a>
    </p>
    <upload-files
      label="请上传要添加的节点列表"
      upload_button_text="上传并解析"
      base_url="/api/node_manager/import_node"
      prepend_icon="mdi-table-arrow-up"
      :success_callback="data => results = data.results"
      hide_progress
    />
    <v-card class="pa-3" v-if="results.datas.length > 0">
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
            v-for="(item, index) in results.datas"
            :key="item"
          >
            <td>
              <p v-if="results.errors[index][0]" class='error'>{{ results.error_msgs[index][0] }}</p>
              <p v-else>{{ item[0] }}</p>
            </td>
            <td>
              <!--              <v-chip-group v-if="node_item.node_tags.length > 0">-->
              <!--                <v-chip v-for="tag in node_item.node_tags" :key="tag">{{ tag }}</v-chip>-->
              <!--              </v-chip-group>-->
              <!--              <p v-else>无</p>-->
              <p v-if="results.errors[index][1]" class='error'>{{ results.error_msgs[index][1] }}</p>
              {{ item[1] ? item[1] : '无' }}
            </td>
            <td>
              <p v-if="results.errors[index][2]" class='error'>{{ results.error_msgs[index][2] }}</p>
              <p v-else>{{ item[2] ? item[2] : '无' }}</p>
            </td>
            <td>
              <p v-if="results.errors[index][3]" class='error'>{{ results.error_msgs[index][3] }}</p>
              <p v-else>{{ item[3] ? item[3] : '未选择' }}</p>
            </td>
            <td>
              <p v-if="results.errors[index][4]" class='error'>{{ results.error_msgs[index][4] }}</p>
              <v-checkbox v-else color="primary" v-model="item[4]" disabled hide-details/>
            </td>
            <td>
              <p v-if="results.errors[index][5]" class='error'>{{ results.error_msgs[index][5] }}</p>
              <p v-else>{{ item[5] ? item[5] : '未选择' }}</p>
            </td>
            <td>
              <p v-if="results.errors[index][6]" class='error'>{{ results.error_msgs[index][6] }}</p>
              <p v-else>{{ item[6] ? item[6] : '未填写' }}</p>
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
