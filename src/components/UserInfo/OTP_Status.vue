<script>
import bind_otp from "@/components/dialogs/OTP/bind.vue";
import message from "@/scripts/utils/message";
import dialogs from "@/scripts/utils/dialogs";
import OTP_CheckAndBind from "@/scripts/apis/OTP_CheckAndBind";
import unbind_otp from "@/components/dialogs/OTP/unbind.vue";

export default {
  name: "OTP_bind",
  computed: {
    dialogs() {
      return dialogs
    }
  },
  components: {unbind_otp, bind_otp},
  data() {
    return {
      flag: false,
      code_len: null,
    }
  },
  created() {
  },
  methods: {
    bind() {
      new OTP_CheckAndBind.bind().sendEmailCode().then(res=>{
        this.code_len = res.data.data.code_len
        this.flag = true
        message.showSuccess(this, res.data.msg)
      })
    },
    unbind() {
      new OTP_CheckAndBind.unbind().sendEmailCode().then(res=>{
        this.code_len = res.data.data.code_len
        this.flag = true
        message.showSuccess(this, res.data.msg)
      })
    },
    test() {
      dialogs.showVerifyOTP_Dialog().then(val=>{
        console.log(val)
      }).catch(err=>{
        console.log(err)
      })
    }
  }
}
</script>

<template>
  <v-card title="OTP令牌">
    <v-card-text>
      <v-container v-if="!$user.enableOTP">
        <span><v-icon icon="mdi:mdi-alert" size="32px" color="error"></v-icon> 未绑定OTP令牌</span>
        <v-btn color="primary" size="small" @click="bind">去绑定</v-btn>
      </v-container>
      <v-container v-if="$user.enableOTP">
        <span><v-icon icon="mdi:mdi-check" size="32px" color="success"></v-icon> 已绑定OTP令牌</span>
        <v-btn color="primary" size="small" @click="unbind">解绑</v-btn>
      </v-container>
    </v-card-text>
  </v-card>
  <div>
    <bind_otp
      v-if="!$user.enableOTP"
      :flag="flag"
      :input-len="code_len"
      @close="flag=false"
      @success="$user.enableOTP=true; flag=false"
    />
    <unbind_otp
      v-if="$user.enableOTP"
      :input-len="code_len"
      :flag="flag"
      @close="flag=false"
      @success="$user.enableOTP=false; flag=false"
    />
  </div>
</template>

<style scoped>
.v-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
