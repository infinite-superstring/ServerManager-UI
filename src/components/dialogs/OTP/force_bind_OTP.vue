<script>
import force_bind__verify_email from "@/components/dialogs/OTP/force_bind/verify_email.vue";
import force_bind__verify_otp from "@/components/dialogs/OTP/force_bind/verify_OTP.vue";
import {useUserStore} from "@/store/userInfo";

export default {
  name: "forceBindOTP",
  components: {force_bind__verify_otp, force_bind__verify_email},
  data() {
    return {
      flag: true,
      step: null,
      steps: ['验证邮箱', '绑定令牌', '完成'],
      qrcode: null,
    }
  },
  props: ['close', 'confirm'],
  methods: {
    submit_and_next(step, callback) {
      /**
       * 提交并下一步
       * @param step 步
       * @param callback 回调
       */
      switch (step) {
        case 1: {
          const res = this.$refs.verify_email.submit()
          if (!res) {
            return
          }
          res.then((res) => {
            if (!res) {
              return
            }
            this.qrcode = res.data.data.qrcode
            callback(res)
          })
          break
        }
        case 2: {
          const res = this.$refs.verify_otp.submit()
          if (!res) {
            return
          }
          res.then((res) => {
            if (!res) {
              return
            }
            callback()
            this.qrcode = null
            useUserStore().enableOTP = true
          })
          break
        }
      }
    },
    finish() {

      this.close()
    }
  }
}
</script>

<template>
  <v-dialog
    v-model="flag"
    @close="close()"
    persistent
  >
    <v-sheet
      class="py-4 px-4 mx-auto"
      elevation="4"
      max-width="700"
      rounded="lg"
      width="100%"
    >
      <div class="text-center">
        <h3 class="text-h5">绑定OTP令牌</h3>
        <div class="text-subtitle-2 font-weight-light mb-3">
          站点已启用强制令牌绑定，您需完成令牌绑定后方可进行其他操作
        </div>
      </div>


      <v-stepper
        v-model="step"
        :items="steps"
        flat
      >
        <template v-slot:item.1>
          <v-card flat>
            <force_bind__verify_email ref="verify_email"/>
          </v-card>
        </template>

        <template v-slot:item.2>
          <v-card flat>
            <force_bind__verify_otp ref="verify_otp" :qrcode="qrcode"/>
          </v-card>
        </template>

        <template v-slot:item.3>
          <v-card class="d-flex flex-column align-center" flat>
            <v-empty-state icon="mdi-check-decagram">
              <template v-slot:media>
                <v-icon color="green"></v-icon>
              </template>

              <template v-slot:title>
                <div class="text-h6">
                  完成
                </div>
              </template>

              <template v-slot:text>
                <div class="text-medium-emphasis text-caption">
                  您已完成绑定流程，您可以开始使用本系统
                </div>
              </template>
            </v-empty-state>
          </v-card>
        </template>

        <template v-slot:actions="{next}">
          <v-card-actions class="d-flex justify-end">
            <v-btn @click="submit_and_next(step, next)" v-if="step < steps.length">提交并下一步</v-btn>
            <v-btn v-else @click="finish">完成</v-btn>
          </v-card-actions>
        </template>
      </v-stepper>

    </v-sheet>
  </v-dialog>
</template>

<style scoped>

</style>
