<script>
import user from "@/scripts/admin/users"
import message from "@/scripts/utils/message";

export default {
  name: "selectUser",
  props: {
    label: {
      type: String,
      required: false,
      default: "选择用户"
    },
    value: {
      type: String,
      required: false,
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
    if (this.value) {
      user.getUserInfo(this, this.value).then(res => {
        if (res.data.status === 1) {
          this.new_value = {id: res.data.data.id, userName: res.data.data.userName}
        }
      })
    }
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
      user.getUserList(val).then(res=>{
        if (res.data.status !== 1) {
          return message.showWarning(this, res.data.msg)
        }
        if (res.data.data.PageContent.length > 0) {
          this.userListData = res.data.data.PageContent.map(({ id, userName }) => ({ id, userName }))
        } else {
          this.userListData = []
        }
      })
    }
  },
  watch: {
    new_value(val) {
      if (val && val.id != this.value) {
        this.$emit('update:select_user', val.id)
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
  item-title="userName"
  item-value="id"
  return-object
  auto-select-first
></v-autocomplete>
</template>

<style scoped>

</style>
