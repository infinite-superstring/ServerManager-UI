<script>
export default {
  name: "init_user_finish"
}
</script>

<template>
  <v-card flat>
    <v-empty-state icon="$success">
      <template v-slot:media>
        <v-icon color="green"></v-icon>
      </template>

      <template v-slot:title>
        <div class="text-h6">
          完成
        </div>
      </template>

      <template v-slot:text>
        <div class="text-medium-emphasis text-caption">
          您已完成账户初始化流程，您可以开始使用本系统
        </div>
      </template>
    </v-empty-state>
  </v-card>
</template>

<style scoped>

</style>
