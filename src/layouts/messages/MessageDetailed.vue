<template>
  <v-card class="content-card pageMain-card">
    <div class="email-content" v-html="content"></div>
    <div class="operation" v-if="content">
      <v-tooltip text="删除这条邮件">
        <template v-slot:activator="{ props }">
          <v-btn @click="delMessage" v-bind="props" icon="mdi-trash-can"></v-btn>
        </template>
      </v-tooltip>
    </div>
  </v-card>
  <MessagesDrawers
    ref="messageDrawer"
    @deleteAll="content = ''"
    @select="onSelect"/>
</template>

<script setup>
import {ref} from 'vue';
import MessagesDrawers from '@/components/messages/Drawers.vue'
import axion from '@/scripts/utils/axios.js'
import confirmDialog from '@/scripts/utils/confirmDialog.js'
import message from "@/scripts/utils/message";
import {deleteByIdApi, getByIdApi} from "@/scripts/apis/message";

const content = ref('')

const messageDrawer = ref()


const currentId = ref(NaN)

const getById = () => {
  getByIdApi(currentId.value).then((r) => {
    content.value = r.data.data
  })
}

const onSelect = (id) => {
  currentId.value = id
  getById()
}

const delMessage = () => {
  confirmDialog('确定删除该消息吗？', '删除后无法找回', () => {
    deleteByIdApi(currentId.value).then((r) => {
      message.showSuccess(this, r.data.msg)
      content.value = ''
      messageDrawer.value.getList()
    })
  })
}

</script>

<style scoped>
.content-card {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.email-content {
  width: 100%;
  padding-left: 5em;
  padding-right: 5em;
  padding-bottom: 10em;
}

.email-content #content {
  text-indent: 2em;
}

.operation {
  position: fixed;
  bottom: 2em;
}

@media screen and (max-width: 600px) {
  .email-content {
    padding-left: 0;
    padding-right: 0;
    padding-bottom: 0;
  }

  .operation {
    position: inherit;
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 2.5em;
    /*bottom: 2em;*/
  }
}
</style>
