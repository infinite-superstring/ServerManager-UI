<template>
  <v-dialog
    :model-value="props.status"
    activator="parent"
    min-width="400px"
    width="auto"
    persistent
  >
    <v-card>
      <v-card-title>新增记录</v-card-title>
      <v-card-text>
        <div>
          <div class="text-caption">
            用户名
          </div>
          <v-text-field type="text" v-model="userName"></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn base-color="error" @click="close()">取消</v-btn>
        <v-btn base-color="success" @click="submit()">确定</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>

const props = defineProps({
  status: {
    type: Boolean,
    required: true,
    default: false
  }
})
</script>


<style scoped>

</style>
