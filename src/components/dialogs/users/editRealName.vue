<script>
import user from "@/scripts/apis/users"
import message from "@/scripts/utils/message";
import InputDialog from "@/components/dialogs/input/inputDialog.vue";
export default {
  name: "editRealName",
  components: {InputDialog},
  emits: ['close'],
  props: {
    flag: {
      type: Boolean,
      required: true
    },
    uid: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      value: null,
      newValue: null
    }
  },
  watch: {
    flag(val) {
      if (!val) {
        this.value = null
      } else {
        user.getUserInfo(this, this.uid).then(res=>{
          this.value = res.data.data.realName
          this.newValue = this.value
        })
      }
    }
  },
  methods: {
    submit() {
      /**
       * 提交
       */
      user.updateUserInfo(this, this.uid, {realName: this.value}).then(()=>{
        this.close()
      })
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>

<template>
  <input-dialog
    title="编辑真实姓名"
    :flag="flag"
    :value="value"
    @close="close"
    @update="args => {value = args}"
    @confirm="submit()"/>
</template>

<style scoped>

</style>
