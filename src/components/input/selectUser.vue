<script>
import user from "@/scripts/apis/users"
import message from "@/scripts/utils/message";
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
      required: false,
      default: false
    },
    singleLine: {
      required: false,
      default: false
    },
    hideDetails: {
      required: false,
      default: false
    }

  },
  emits: ["update:select_user"],
  data: () => {
    return {
      input: "",
      new_value: null,
      userListData: []
    }
  },
  mounted() {
    if (this.value && !(this.value instanceof Object)) {
      user.getUserInfo(this, this.value).then(res => {
        if (res.data.status === 1) {
          this.new_value = {id: res.data.data.id, userName: res.data.data.userName}
        }
      })
    } else if (this.value instanceof Object && this.value.length > 0) {
      this.new_value = this.value
    }
    this.getUserList()
  },
  unmounted() {
    this.input = ""
    this.userListData = []
  },
  methods: {
    search(val) {
      if (!val) {
        return
      }
      this.getUserList(val)
    },
    getUserList(search = '', curr = 1, pageSize = 5) {
      user.getUserList(this, search, curr, pageSize)
        .then(res => {
          if (res.data.status !== 1) {
            return message.showWarning(this, res.data.msg)
          }
          if (res.data.data.PageContent.length > 0) {
            this.userListData = res.data.data.PageContent.map(({id, userName}) => ({id, userName}))
          } else {
            this.userListData = []
          }
        })
    },
  },
  watch: {
    new_value(val) {
      console.log(val)
      console.log(this.multiple)
      if (val && val.id != this.value && !this.multiple) {
        this.$emit('update:select_user', val.id)
      }
      if (this.multiple) {
        this.$emit('update:select_user', objectUtils.object_select_value_to_list(val, "id"))
      }
    }
  }
}
</script>

<template>
  <v-autocomplete
    :label="label"
    v-model="new_value"
    @update:search="value => search(value)"
    :items="userListData"
    :multiple="multiple"
    :chips="multiple"
    item-title="userName"
    item-value="id"
    :single-line="singleLine"
    :hide-details="hideDetails"
    return-object
    auto-select-first
  ></v-autocomplete>
</template>

<style scoped>

</style>
