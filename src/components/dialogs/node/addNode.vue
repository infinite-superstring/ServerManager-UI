<script>
import inputTag from "@/components/input/inputTag.vue";
import node_group from "@/scripts/apis/node_group";
import UploadFiles from "@/components/input/uploadFiles.vue";
import add_node__single_mode from "@/components/dialogs/node/create/single_mode.vue";
import Add_node__multiple_mode from "@/components/dialogs/node/create/multiple_mode.vue";

export default {
  name: "addNode",
  components: {Add_node__multiple_mode, add_node__single_mode, UploadFiles, inputTag},
  props: {
    flag: {
      type: Boolean,
      required: true,
    }
  },
  emits: ['close', 'success'],
  data() {
    return {
      tag_items: [],
      groupListData: null,
    }
  },
  mounted() {
    this.load_node_group()
  },
  methods: {
    load_node_group(search = "") {
      node_group.get_node_group_list(search).then((res) => {
        this.groupListData = res.data.data.PageContent.map((({group_id, group_name}) => ({group_id, group_name})))
      })
    },
    close() {
      this.$emit('close')
    },
    submit() {
      if (this.$web_config.viewMode.nodeAddMode === "Single") {
        this.$refs.single_mode__form.submit()
      } else if (this.$web_config.viewMode.nodeAddMode === "Multiple") {
        this.$refs.multiple_mode__form.submit()
      }
    }
  },
  computed: {

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
        v-model="$web_config.viewMode.nodeAddMode"
        class="ma-3"
      >
        <v-tab value="Single">单个添加</v-tab>
        <v-tab value="Multiple">批量添加</v-tab>
      </v-tabs>

      <v-card-text>
        <v-tabs-window v-model="$web_config.viewMode.nodeAddMode">
          <v-tabs-window-item value="Single">
            <add_node__single_mode
              ref="single_mode__form"
              @success="args => {$emit('success', args); close()}"
            />
          </v-tabs-window-item>

          <v-tabs-window-item value="Multiple">
            <add_node__multiple_mode
              ref="multiple_mode__form"
              @success="() => {$emit('success'); close()}"
            />
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
      <v-card-actions>
        <v-btn color="success" @click="submit">{{ $web_config.viewMode.nodeAddMode === 'Multiple' ? '保存并下载配置文件' : '确定' }}</v-btn>
        <v-btn color="error" @click="close">取消</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
