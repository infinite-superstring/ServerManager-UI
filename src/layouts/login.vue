<template>
    <v-main>
            <div class="loginBox">
                <h1 class="title">登录</h1>
                <v-form fast-fail @submit.prevent action="/auth/login" method="post">
                    <div class="inputs">
                        <v-text-field label="用户名" type="text" name="username" v-model.trim="username"
                            :rules="userNameRules" variant="solo-filled" clearable></v-text-field>
                        <v-text-field label="密码" type="password" name="password" v-model.trim="password"
                            :rules="passwordRules" variant="solo-filled" clearable></v-text-field>
                    </div>
                    <div class="buttons">
                        <v-btn id="login" type="submit" color="primary" @click="submit()">登录</v-btn>
                        <v-btn id="forgetPassword" @click="openHelpPage()">忘记密码</v-btn>
                    </div>
                </v-form>
            </div>
    </v-main>
</template>

<script>
import axios from 'axios'
import {useUserStore} from "@/store/userInfo";

export default {
    data: () => ({
        username: '',
        password: '',
        userNameRules: [
            value => {
                if (!value) {
                    return "用户名不能为空"
                }
                return true
            }
        ],
        passwordRules: [
            value => {
                if (!value) {
                    return "密码不能为空"
                }
                return true
            }
        ]
    }),
    methods: {
        submit() {
            // console.log("submit data......");
            axios.post("/auth/login", { "username": this.username, "password": this.password }).then(res => {
                let data = res.data
                console.log(data);
                switch (data.status) {
                    case 1:
                      useUserStore().getUserInfo().then(()=>{
                        this.$router.push({name:"dashboard"})
                      })
                      break;
                    default:
                      this.$notify.create({
                        text: data.msg,
                        level: 'error',
                        location: 'bottom right',
                        notifyOptions: {
                          "close-delay": 3000
                        }
                      })
                      break;
                }
            }).catch(err => {
                this.$notify.create({
                  text: err.message,
                  level: 'error',
                  location: 'bottom right',
                  notifyOptions: {
                    "close-delay": 3000
                  }
                })
                console.warn(err);
            })
        },
        openHelpPage() {
            // TODO
        }
    }
}

</script>

<style lang="scss" scoped>
@import "@/styles/LoginPage/login";
</style>
