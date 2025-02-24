<script>
import axios from "axios";
import Cropper from "cropperjs";
import bus from 'vue3-eventbus'
import 'cropperjs/dist/cropper.css';
import message from "@/scripts/utils/message";
import fileUtils from "@/scripts/utils/fileUtils";
import bus_constant from "@/scripts/constant/bus_constant";
import {editInfoApi, uploadAvatarApi} from "@/scripts/apis/users";

export default {
  name: "editUserInfo",
  data: () => {
    return {
      id: "",
      userName: "",
      realName: "",
      email: "",
      group: "",
      avatarUrl: "/api/userInfo/getAvatar",
      uploadAvatar: {
        flag: false,
        file: null,
        cropper: null
      }
    }
  },
  emits: ["update:"],
  mounted() {
    this.id = this.$user.id
    this.userName = this.$user.userName
    this.realName = this.$user.realName
    this.email = this.$user.email
    this.group = this.$user.group
  },
  methods: {
    saveUserInfo() {
      editInfoApi({
        data: {
          userName: this.userName,
          email: this.email
        }
      }).then(() => {
        this.$user.getUserInfo()
        message.showSuccess(this, "用户信息保存成功")
        bus.emit(bus_constant.UPDATE_USER_INFO)
      })
    },
    // 开启头像上传框
    openAvatarUploader() {
      document.getElementById("uploadAvatar").click()
    },
    // 头像裁剪
    avatarCut() {
      console.log('avatarCut called')
      // 检查是否为图像文件
      if (this.uploadAvatar.file && this.uploadAvatar.file.type.startsWith('image/')) {
        this.uploadAvatar.cropper = null
        this.uploadAvatar.flag = true
        this.$nextTick(() => {
          const previewImage = document.getElementById('previewImage');
          console.log(previewImage)
          previewImage.src = URL.createObjectURL(this.uploadAvatar.file);
          // 初始化 cropper.js
          this.uploadAvatar.cropper = new Cropper(previewImage, {
            aspectRatio: 1, // 固定裁剪框的宽高比
            viewMode: 1,    // 显示裁剪框，允许移动图片
            dragMode: 'move', // 设置拖动模式为移动图片
            autoCropArea: 1,  // 初始裁剪框占图像的比例
            responsive: true,  // 支持响应式布局
            cropBoxResizable: false, // 禁止用户调整裁剪框的宽高
            rotatable: false,
            outputType: 'webp'
          });
          this.uploadAvatar.cropper.setCropBoxData({
            width: 512,
            height: 512
          })
        })
      } else {
        this.uploadAvatar.flag = false
      }
    },
    // 头像上传
    async uploadAvatarImg() {
      const imgBase64 = this.uploadAvatar.cropper.getCroppedCanvas({
        maxHeight: 512,
        maxWidth: 512
      }).toDataURL("image/webp", 0.8)

      uploadAvatarApi({
        data: {
          avatarImg: imgBase64,
          avatarHash: await fileUtils.calculateMD5(imgBase64)
        }
      }).then(() => {
        message.showSuccess(this, "头像上传成功")
        this.uploadAvatar.flag = false
        this.uploadAvatar.file = null
        this.avatarUrl = "/api/userInfo/getAvatar?v" + Math.random()
        bus.emit(bus_constant.UPDATE_AVATAR)
      })
    }
  },
  watch: {
    "uploadAvatar.file"(val) {
      console.log('flag changed:', this.uploadAvatar.flag)
      if (val !== null && val.type.startsWith('image/')) {
        this.avatarCut()
      }
    }
  }
}
</script>

<template>
  <v-card title="基础信息修改">
    <v-card-text>
      <v-container class="userInfoEdit">
        <v-row>
          <v-col class="left" cols="4">
            <v-row class="avatar">
              <v-avatar :image="avatarUrl" size="100%" color="surface-variant"></v-avatar>
              <div class="editAvatar" @click="openAvatarUploader()">
                <v-icon icon="mdi:mdi-pencil-outline"></v-icon>
                <span>更换头像</span>
                <input
                  type="file"
                  accept="image/*"
                  id="uploadAvatar"
                  @change="uploadAvatar.file = $event.target.files[0]"
                  style="display: none;">
              </div>
            </v-row>
          </v-col>
          <v-col class="editInfo">
            <v-row>
              <div>
                <div class="text-caption">
                  用户ID
                </div>
                <v-text-field type="number" disabled v-model="id" clearable variant="solo"></v-text-field>
              </div>
            </v-row>
            <v-row>
              <div>
                <div class="text-caption">
                  用户名
                </div>
                <v-text-field type="text" v-model="userName" clearable variant="solo"></v-text-field>
              </div>
            </v-row>
            <v-row>
              <div>
                <div class="text-caption">
                  真实姓名
                </div>
                <v-text-field type="text" disabled v-model="realName" clearable variant="solo"></v-text-field>
              </div>
            </v-row>
            <v-row>
              <div>
                <div class="text-caption">
                  用户组
                </div>
                <v-text-field type="text" disabled v-model="group" clearable variant="solo"></v-text-field>
              </div>
            </v-row>
            <v-row>
              <div>
                <div class="text-caption">
                  电子邮箱
                </div>
                <v-text-field type="email" v-model="email" clearable variant="solo"></v-text-field>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-btn block color="success" @click="saveUserInfo()">保存修改</v-btn>
    </v-card-actions>
  </v-card>
  <div>
    <v-dialog
      v-model="uploadAvatar.flag"
      activator="parent"
      min-width="400px"
      width="auto"
      persistent
    >
      <v-card>
        <v-card-title>裁剪图片</v-card-title>
        <v-card-text>
          <img id="previewImage">
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="uploadAvatar.flag = false">取消</v-btn>
          <v-btn color="success" @click="uploadAvatarImg()">确定</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style scoped>
.editInfo .v-row > div {
  width: 100%;
}

.userInfoEdit {
  min-width: 300px;
}

.avatar {
  width: 85%;
  position: relative;
}

.editAvatar {
  width: 100%;
  height: 100%;
  position: absolute;
  display: none;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-radius: 50%;
  background-color: rgba(0, 0, 0, .3);
}

.editAvatar .v-icon {
  font-size: 30px;
}

.editAvatar span, .editAvatar .v-icon {
  color: white;
}

.avatar:hover .editAvatar {
  display: flex;
}

#previewImage {
  width: 100%;
  max-height: 70vh;
}
</style>
