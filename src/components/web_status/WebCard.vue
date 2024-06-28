<template>
  <div class="container">
    <v-card v-for="(item) in list" class="web-card" :key="item.id">
      <!--基本信息-->
      <v-card-title>
        <div class="web-info">
          {{ item.title }}
          <span class="web-info-option">
              <v-btn size="x-small" variant="text">修改</v-btn>
              <v-btn size="x-small" variant="text" color="red">删除</v-btn>
            </span>
        </div>
      </v-card-title>
      <v-card-text>
        <!--监控状态-->
        <div class="status">
          <div class="status-item">
            <p>主机</p>
            <p>{{ item.host }}</p>
          </div>
          <div class="status-item">
            <p>状态</p>
            <p>
              <span
                :style="{color:'green'}"
                v-if="/^2/.test(item.status)">
                <v-icon
                  size="x-small">
                  mdi-check-circle-outline
                </v-icon>
                在线
              </span>
              <span
                :style="{color:'orange'}"
                v-if="/^3/.test(item.status)">
                <v-icon size="x-small">
                  mdi-help-circle-outline
                </v-icon>
                警告
              </span>
              <span
                :style="{color:'red'}"
                v-if="/^4/.test(item.status)">
                <v-icon size="x-small">
                  mdi-close-circle-outline
                </v-icon>
                离线
              </span>
              <span
                :style="{color:'red'}"
                v-if="/^5/.test(item.status)">
                <v-icon size="x-small">
                  mdi-close-circle-outline
                </v-icon>
                错误
              </span>
            </p>
          </div>
          <div class="status-item">
            <p>延迟</p>
            <p><span :style="{color: getDelayColor(item.online ? item.delay : 999)}">{{ item.online ? item.delay : 999 }}ms</span></p>

          </div>
        </div>
        <!--标签-->
        <div>
          <v-chip-group>
            <v-chip v-for="(item, index) in 3">
              {{ index }}{{ index }}{{ item }}
            </v-chip>
          </v-chip-group>
        </div>
      </v-card-text>
      <v-divider/>
      <v-card-actions>
        <v-btn base-color="#00B0FF" block>
          进入控制页
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script setup>


import {ref, watch} from "vue";

const props = defineProps({
  list: {
    type: Array,
    required: true
  },
  onlineInfo: {
    type: Object,
    required: false,
    default: () => {
      return {
        ms: 460,
        status: false
      }
    }
  }
})

const list = ref(props.list)
watch(() => props.list, (newValue) => {
  list.value = newValue
})

/**
 * 获取延迟文字颜色
 * @param {number} item 延迟时间，单位：毫秒
 * @returns {string} 颜色名称
 */
const getDelayColor = (item) => {
  if (item <= 30) {
    return '#4CAF50'; // 极快，绿色
  } else if (item <= 50) {
    return '#1B5E20'; // 良好，浅绿色
  } else if (item <= 100) {
    return '#FDD835'; // 普通，黄色
  } else if (item <= 200) {
    return '#F9A825'; // 较高，橙色
  } else {
    return 'red'; // 非常高，红色
  }
};

</script>


<style scoped>
.container {
  /*弹性布局，左对齐，自动换行*/
  max-width: 100%;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.web-card {
  width: 32%;
  display: flex;
  flex-direction: column;
}


.web-info {
  display: flex;
  align-items: center;
}

.status {
  display: flex;
  justify-content: space-between;
}

.web-info-option {
  margin-left: auto;
}

.status-item {
  display: flex;
  flex-direction: column;
  /*顶端对齐底端对齐*/
  align-items: center;
  justify-content: space-between;
  min-height: 100px;
  padding: 20px;
}

.status-item > p {
  margin: 5px;
  width: 100%;
  text-align: center;
}

/*平板端*/
@media screen and (max-width: 1000px) {
  .web-card {
    min-width: 49%;
    min-height: 250px;
  }
}

/*手机端*/
@media screen and (max-width: 700px) {
  .web-card {
    min-width: 100%;
    min-height: 250px;
  }

  .status {
    display: block;
  }

  .status-item {
    display: block;
  }
}

@media screen and (max-width: 400px) {
  .web-card {
    min-width: 100%;
    min-height: 250px;
  }

  .status {
    display: block;
  }

  .status-item {
    display: block;
  }
}
</style>
