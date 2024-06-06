<script>
export default {
  name: "loadingOverlay",
  props: {
    flag: {
      type: Boolean,
      required: true,
    },
    height: {
      type: Number,
      required: false,
      default: 300
    }
  }
}
</script>

<template>
  <v-sheet :height="height" width="100%">
    <v-overlay
      :model-value="flag"
      class="align-center justify-center cursor-not-allowed"
      contained
      persistent
      no-click-animation
    >

      <v-empty-state
        title="正在加载中，我们马上回来~"
      >
        <template v-slot:media>
          <v-progress-circular
            :size="50"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </template>
      </v-empty-state>
    </v-overlay>
  </v-sheet>
</template>

<style scoped>
.v-progress-circular {
  margin-bottom: 25px;
}
.v-empty-state {
  color: whitesmoke;
}
</style>
