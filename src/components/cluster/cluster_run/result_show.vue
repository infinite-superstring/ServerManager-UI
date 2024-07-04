<script>
export default {
  name: "result_show"
}
</script>

<template>
  <v-card>
    <v-card-title>
      <v-btn icon="mdi:mdi-arrow-left" variant="text"/>
      执行结果(UUID)
    </v-card-title>
    <v-card-text height="600px">
      <v-select label="节点"></v-select>
      <v-sheet width="100%">
        <div id="terminal" ref="terminal"></div>
      </v-sheet>
    </v-card-text>
<!--    <v-card-actions>-->
<!--      <v-btn>清空</v-btn>-->
<!--    </v-card-actions>-->
  </v-card>
</template>

<style scoped>

</style>
