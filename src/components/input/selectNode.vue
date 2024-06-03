<script>
import message from "@/scripts/utils/message";
import axios from "axios";

export default {
  name: "selectNode",
  data: () => {
    return {
      select: [],
      select2: [],
      select2_list: [],
      nodeListData: [],
    }
  },
  methods: {
    getNodeBaseList(search = "", page_index = 1, page_size = 20) {
      axios.post('/api/node_manager/getBaseNodeList', {
        page: page_index,
        page_size: page_size,
        search: search
      }).then((res) => {
        if (res.data.status === 1) {
          this.nodeListData = res.data.data.PageContent
          if (this.select2_list) {
            for (let i = 0; i < this.select2_list.length; i++) {
              this.nodeListData.remove(this.select2_list[i])
            }
          }
        } else {
          console.warn(res.data.msg)
        }
      }).catch(err => {
        console.error(err)
        message.showApiErrorMsg(err.message)
      })
    },
    add() {
      console.log('click')
      // console.log(this.select)
      // console.log(this.select2_list)
      this.select2_list = this.select2_list.concat(this.select)
      for (let i = 0; i < this.select.length; i++) {
        console.log(this.select2_list[i])
        this.nodeListData = this.nodeListData.filter(item => item.uuid !== this.select2_list[i].uuid)
        // console.log(temp)
        // this.select.pop()
      }
      this.select = []
      console.log(this.select2_list)
    },
    del() {

    }
  },
  mounted() {
    this.getNodeBaseList()
  },
  watch: {
    select(newVal) {
      console.log(newVal)
    }
  }
}
</script>

<template>
  <v-autocomplete
    v-model="select"
    :items="nodeListData"
    item-title="name"
    item-value="uuid"
    label="请选择节点，点击Tag取消选择"
    @update:search="value => getNodeBaseList(value)"
    multiple
    return-object
    auto-select-first
  >
    <template v-slot:selection="data">
      <v-chip
        :key="data.item"
        :model-value="data.selected"
        size="small"
        @click:close="select.splice(data.index, 1)"
        closable
      >
        {{ data.item.title }}
      </v-chip>
    </template>
  </v-autocomplete>
  <!--  <div class="select_nodes">-->
  <!--    <div class="left">-->
  <!--      <div class="top">-->
  <!--        <v-text-field label="按节点名搜索" variant="underlined" density="compact" clearable hide-details></v-text-field>-->
  <!--      </div>-->
  <!--      <div class="bottom">-->
  <!--        <v-item-group v-model="select" multiple>-->
  <!--        <v-container>-->
  <!--          <v-virtual-scroll-->
  <!--            :height="300"-->
  <!--            :items="nodeListData"-->
  <!--          >-->
  <!--            <template v-slot:default="{ item }">-->
  <!--              <v-item :value="item" v-slot="{ isSelected, toggle }">-->
  <!--                <v-sheet-->
  <!--                  :color="isSelected?'primary':''"-->
  <!--                  class="d-flex select_list_item"-->
  <!--                  height="50"-->
  <!--                  dark-->
  <!--                  @click="toggle"-->
  <!--                >-->
  <!--                  <v-scroll-y-transition>-->
  <!--                    <div-->
  <!--                      class="flex-grow-1 align-self-center"-->
  <!--                    >-->
  <!--                      {{ item.name }}-->
  <!--                    </div>-->
  <!--                  </v-scroll-y-transition>-->
  <!--                </v-sheet>-->
  <!--              </v-item>-->
  <!--            </template>-->
  <!--          </v-virtual-scroll>-->
  <!--        </v-container>-->
  <!--      </v-item-group>-->
  <!--      </div>-->
  <!--    </div>-->
  <!--    <div class="center">-->
  <!--      <v-btn color="primary">-->
  <!--        <v-icon icon="mdi-arrow-right" @click="add"></v-icon>-->
  <!--      </v-btn>-->
  <!--      <v-btn color="error">-->
  <!--        <v-icon icon="mdi-arrow-left"></v-icon>-->
  <!--      </v-btn>-->
  <!--    </div>-->
  <!--    <div class="right">-->
  <!--      <v-item-group v-model="select2" multiple>-->
  <!--        <v-container>-->
  <!--          <v-virtual-scroll-->
  <!--            :height="300"-->
  <!--            :items="select2_list"-->
  <!--          >-->
  <!--            <template v-slot:default="{ item }">-->
  <!--              <v-item :value="item" v-slot="{ isSelected, toggle }">-->
  <!--                <v-sheet-->
  <!--                  :color="isSelected?'primary':''"-->
  <!--                  class="d-flex select_list_item"-->
  <!--                  height="50"-->
  <!--                  dark-->
  <!--                  @click="toggle"-->
  <!--                >-->
  <!--                  <v-scroll-y-transition>-->
  <!--                    <div-->
  <!--                      class="flex-grow-1 align-self-center"-->
  <!--                    >-->
  <!--                      {{ item.name }}-->
  <!--                    </div>-->
  <!--                  </v-scroll-y-transition>-->
  <!--                </v-sheet>-->
  <!--              </v-item>-->
  <!--            </template>-->
  <!--          </v-virtual-scroll>-->
  <!--        </v-container>-->
  <!--      </v-item-group>-->
  <!--    </div>-->
  <!--  </div>-->


</template>

<style scoped>
.select_nodes {
  padding-top: 5px;
  display: flex;
  justify-content: space-between;

  .center {
    width: 10%;
    min-width: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .v-btn:not(:last-child) {
      margin-bottom: 15px;
    }
  }

  .right, .left {
    flex: 1;
    min-width: 100px;
  }

  .right {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
}

.select_list_item {
  margin-bottom: 5px;
  padding-left: 15px;
}
</style>
