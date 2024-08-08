<script>
import Time_range_selection from "@/components/input/timeRangeSelection.vue";
import SelectUser from "@/components/input/selectUser.vue";
import users from "@/scripts/apis/users";
import dialogs from "@/scripts/utils/dialogs";
import message from "@/scripts/utils/message";

export default {
  name: "node_group_use_rules",
  computed: {
    users() {
      return users
    }
  },
  props: {
    rules: {
      type: Array,
      required: true
    }
  },
  components: {SelectUser, Time_range_selection},
  data: () => {
    return {}
  },
  methods: {
    addRule() {
      if (this.rules.length < 10) {
        this.rules.push({
          users: [],
          week: [],
          start_time: "",
          end_time: ""
        })
      } else {
        message.showError(this, "每个组最多添加10个权限规则")
      }
    },
    delRule() {
      if (this.rules.length > 0) {
        dialogs.confirm("删除规则", "您确定要删除最后一个规则吗", "warning").then(value => {
          if (value) {
            this.rules.pop()
          }
        })
      } else {
        message.showError(this, "没有可删除的规则")
      }
    }
  }
}
</script>

<template>
  <v-card>
    <v-card-text>
      <v-card class="pa-3 rule" v-for="(rule, index) in rules" :key="rule">
        <p class="rule-title">规则{{ index + 1 }}</p>
        <select-user
          label="使用者"
          :value="rule.users"
          multiple
          @update:select_user="select => rule.users = select"
        />
        <v-select
          label="使用周期"
          v-model="rule.week"
          :items="[
              {title: '星期一', value: 'monday'},
              {title: '星期二', value: 'tuesday'},
              {title: '星期三', value: 'wednesday'},
              {title: '星期四', value: 'thursday'},
              {title: '星期五', value: 'friday'},
              {title: '星期六', value: 'saturday'},
              {title: '星期日', value: 'sunday'},
            ]"
          multiple
        />
        <time_range_selection
          :start_time="rule.start_time"
          :end_time="rule.end_time"
          @update:start_time="value => rule.start_time = value"
          @update:end_time="value => rule.end_time=value"
        />
      </v-card>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="addRule">
        <v-icon icon="mdi:mdi-plus"/>
        添加规则
      </v-btn>
      <v-btn color="error" @click="delRule">
        <v-icon icon="mdi:mdi-plus"/>
        删除规则
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<style scoped>
.rule:not(:last-child) {
  margin-bottom: 15px;
}

.rule-title {
  margin-bottom: 10px;
  font-size: 18px;
}
</style>
