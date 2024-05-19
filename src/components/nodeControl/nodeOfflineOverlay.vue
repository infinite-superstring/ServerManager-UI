<script>
export default {
  name: "nodeOfflineOverlay",
  props: {
    flag: {
      type: Boolean,
      required: true,
    }
  }
}
</script>

<template>
  <v-overlay
    :model-value="flag"
    class="align-center justify-center cursor-not-allowed"
    contained
    persistent
    no-click-animation
  >

    <v-empty-state
      title="节点离线中！"
      text="该节点目前不在线，请检查节点客户端与控制器的网络连接"
    >
      <template v-slot:media>
        <v-icon icon="mdi-alert-outline" base-color="#FFEE58"/>
      </template>
    </v-empty-state>
  </v-overlay>
</template>

<style scoped>
.v-empty-state {
  color: whitesmoke;
}
</style>
