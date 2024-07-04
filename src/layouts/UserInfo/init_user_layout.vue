<script>
import Init_user_finish from "@/components/initUser/finish.vue";
import Init_user_info from "@/components/initUser/edit_info.vue";
import Init_user_bind_otp from "@/components/initUser/bind_OTP.vue";
import {useWebsiteSettingStore} from "@/store/webSiteSetting";
import {useUserStore} from "@/store/userInfo";

export default {
  name: "init_user_layout",
  components: {Init_user_bind_otp, Init_user_info, Init_user_finish},
  data() {
    return {
      step: null,
      step_item: [],
      web_config: null
    }
  },
  created() {
    this.web_config = useWebsiteSettingStore
    if (this.web_config.serverConfig?.forceOTP_Bind) {
      this.step_item = ['编辑用户信息', '绑定令牌', '完成']
    } else {
      this.step_item = ['编辑用户信息', '完成']
    }
  },
  methods: {
    submit_and_next(step, callback) {
      /**
       * 提交并下一步
       * @param step 步
       * @param callback 回调
       */
      switch (step) {
        case 1: {
          const submit = this.$refs.edit_user_info.submit()
          if (submit && submit instanceof Promise) {
            submit.then(() => {
              callback()
            })
          }
        }
        // case 2:
        // this.$refs.bind_otp
      }
    },
    finish() {
      useUserStore().isNewUser = false
      this.$router.push({name: "dashboard"})
    }
  },
  watch: {
    step(newVal, oldVal) {
      if (newVal < oldVal) {
        console.log("up")
      } else {
        switch (newVal) {
          case 2:
            if (!this.web_config.serverConfig?.forceOTP_Bind) return
            this.$nextTick(() => {
              this.showQR_Code(this.$refs.qr_show_img, this.step2.qr_code)
            })
        }
        console.log("down")
      }
    }
  }
}
</script>

<template>
  <div class="d-flex align-center justify-center" style="height: 100%; width: 100%">
    <div style="width:60%; min-width: 350px">
      <v-stepper
        v-model="step"
        prev-text=""
        next-text="下一步"
        :items=step_item
      >
        <template v-slot:item.1>
          <init_user_info ref="edit_user_info"></init_user_info>
        </template>

        <template v-slot:item.2 v-if="this.web_config.serverConfig?.forceOTP_Bind">
          <init_user_bind_otp ref="bind_otp"></init_user_bind_otp>
        </template>

        <template v-slot:item.2 v-if="!this.web_config.serverConfig?.forceOTP_Bind">
          <init_user_finish></init_user_finish>
        </template>

        <template v-slot:item.3 v-if="this.web_config.serverConfig?.forceOTP_Bind">
          <init_user_finish></init_user_finish>
        </template>

        <template v-slot:actions="{next}">
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="submit_and_next(step, next)" v-if="step < step_item.length">提交并下一步</v-btn>
            <v-btn v-else @click="finish">完成</v-btn>
          </v-card-actions>
        </template>
      </v-stepper>
    </div>
  </div>
</template>

<style scoped>

</style>
