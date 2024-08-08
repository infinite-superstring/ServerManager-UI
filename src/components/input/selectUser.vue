<script>
import user from "@/scripts/apis/users"
import objectUtils from "@/scripts/utils/objectUtils";

export default {
  name: "selectUser",
  props: {
    label: {
      type: String,
      required: false,
      default: "选择用户"
    },
    value: {
      required: false,
    },
    multiple: {
      type: Boolean,
      required: false,
      default: false
    },
    singleLine: {
      type: Boolean,
      required: false,
      default: false
    },
    hideDetails: {
      type: Boolean,
      required: false,
      default: false
    },
    returnObject: {
      type: Boolean,
      default: false
    }
  },
  emits: ["update:select_user"],
  data: () => {
    return {
      input: "",
      select: null,
      userListData: []
    }
  },
  mounted() {
    this.getUserList()
  },
  unmounted() {
    this.input = ""
    this.userListData = []
  },
  methods: {
    getUserList(search = '', curr = 1, pageSize = 5) {
      user.getUserList(this, search, curr, pageSize).then(res => {
        this.userListData = res.data.data.PageContent.map(({id, userName}) => ({id, userName}))
      })
    },
    returnValue(val) {
      console.log("update:", val)
      if (!val) {return}
      if (this.returnObject) {
        return this.$emit('update:select_user', val)
      }
      if (!this.multiple && val.id !== this.value) {
        return this.$emit('update:select_user', val.id)
      }
      if (this.multiple) {
        return this.$emit('update:select_user', objectUtils.object_select_value_to_list(val, "id"))
      }
    }
  },
  watch: {
    value(val) {
      if (!val || val === this.select) {
        return
      }
      if (!(val instanceof Object)) {
        // 单用户模式
        console.log("user id")
        user.getUserInfo(this, val).then(res => {
          if (res.data.status === 1) {
            this.select = {id: res.data.data.id, userName: res.data.data.userName}
          }
        })
      } else if ((val instanceof Object || val instanceof Array) && val !== this.select) {
        // 多用户模式，直接传递对象
        this.select = this.value
      }
    }
  }
}
</script>

<template>
  <v-autocomplete
    :label="label"
    v-model="select"
    @update:search="value => getUserList(value)"
    @update:modelValue="select => returnValue(select)"
    :items="userListData"
    :multiple="multiple"
    :chips="multiple"
    item-title="userName"
    item-value="id"
    :single-line="singleLine"
    :hide-details="hideDetails"
    return-object
    auto-select-first
  />
</template>

<style scoped>

</style>
