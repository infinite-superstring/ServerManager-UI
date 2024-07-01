<template>
  <v-card class="web-card">
    <!--基本信息-->
    <v-card-title>
      <div class="web-info">
        {{ item.title }}
        <span class="web-info-option">
              <v-btn size="x-small" variant="text">修改</v-btn>
              <v-btn size="x-small" variant="text" color="red" @click="del(item.id)">删除</v-btn>
            </span>
      </div>
    </v-card-title>
    <v-card-text>
      <!--监控状态-->
      <v-row>
        <v-col>
          <p>主机</p>
          <p>{{ item.host.split('/')[0] }}</p>
        </v-col>
        <v-col>
          <p>状态</p>
          <p>
            <web-status-code :code="status_code"/>
          </p>
        </v-col>
        <v-col>
          <p>延迟</p>
          <p>
              <span
                :style="{color: getDelayColor(isOnline ? item.delay : 999)}">
                {{ isOnline ? Array.isArray(delay) ? item.delay : delay : 999 }}ms
              </span>
          </p>
        </v-col>
      </v-row>
      <div class="status">
        <div class="status-item">

        </div>
        <div class="status-item">

        </div>
        <div class="status-item">

        </div>
        <div class="status-item">
          <p>上次错误时间</p>
        </div>
        <div class="status-item">
          <p>接口</p>
          <p>{{ getInterface(item.host) }}</p>
        </div>
      </div>
      <v-divider/>
      <!--      <div>-->
      <!--        {{ props.item.description }}-->
      <!--      </div>-->
    </v-card-text>
    <WebChart v-if="props.online" ref="webChartRef" :time="time" :data="delay"/>
    <WebOffline v-else :title="item.title"/>
  </v-card>
</template>

<script setup>
import {ref, watch} from "vue";
import WebChart from "@/components/web_status/WebChart.vue";
import WebOffline from "@/components/web_status/WebOffline.vue";
import WebStatusCode from "@/components/web_status/WebStatusCode.vue";

const webChartRef = ref()
const emit = defineEmits(['delete', 'update'])
const props = defineProps({
  item: {
    type: Object,
    required: true
  },
  time: {
    type: Object,
    required: true
  },
  delay: {
    type: Object,
    required: true
  },
  online: {
    type: Boolean,
    required: true,
    default: true
  },
  status_code: {
    type: Number,
    required: true,
    default: 500
  }
})

const isOnline = ref(true)
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

/**
 * 获取主机接口
 * @param {string} host 主机地址
 * @returns {string} 接口地址
 */
const getInterface = (host) => {
  const matchResult = host.match(/https?:\/\/[^/]*(\/?.*)/);
  return matchResult ? (matchResult[1] || '/') : '/';
};

const del = (id) => {
  emit('delete', id)
}

watch(() => props.online, val => {
  console.log(props.item.host + '状态' + val)
  isOnline.value = val
}, {deep: true})

</script>


<style scoped>

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
  /*自动换行*/
  flex-wrap: wrap;
}

.web-info-option {
  margin-left: auto;
}

.status-item {
  width: 30%;
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

  .status-item {
    display: block;
  }
}

@media screen and (max-width: 400px) {
  .web-card {
    min-width: 100%;
    min-height: 250px;
  }

  .status-item {
    display: block;
  }
}
</style>
