<template>
  <v-card title="消息中心" class="pageMain-card">
    <v-card-text style="height: 100%;">
      <!--消息详细-->
      <MessageDetailed></MessageDetailed>
    </v-card-text>
  </v-card>
</template>

<script setup>
import MessageDetailed from "@/layouts/messages/MessageDetailed.vue";
</script>
