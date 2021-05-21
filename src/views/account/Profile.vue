<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item :label="$t('views.profile.nickname')">
            <a-input :placeholder="$t('views.profile.nickname-placeholder')" v-model="personalInfo.nickname"/>
          </a-form-item>
          <a-form-item :label="$t('views.profile.realname')">
            <a-input :placeholder="$t('views.profile.name-sample')" v-model="personalInfo.realname"/>
          </a-form-item>

          <a-form-item :label="$t('views.profile.email')" :required="false">
            <a-input :placeholder="$t('views.profile.email-placeholder')" v-model="personalInfo.email"/>
          </a-form-item>

          <a-form-item :label="$t('views.profile.qq')" :required="false">
            <a-input :placeholder="$t('views.profile.common-qq')" v-model="personalInfo.qq"/>
          </a-form-item>

          <a-form-item :label="$t('views.profile.tel')" :required="false">
            <a-input :placeholder="$t('views.profile.common-tel')" v-model="personalInfo.tel"/>
          </a-form-item>


          <a-form-item :label="$t('views.profile.tel')">
            <a-textarea rows="4" :placeholder="$t('views.profile.you-can-write-info-here')"
                        v-model="personalInfo.intro"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary" @click="updatePersonalInfo">{{ $t('views.profile.update-profile') }}</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <a-upload name="file" :multiple="false" action="/files/upload" :show-upload-list="false" @change="uploadAvatar"
                  :before-upload="beforeUpload">
          <div class="ant-upload-preview">
            <a-icon type="cloud-upload-o" class="upload-icon"/>
            <div class="mask">
              <a-icon type="plus"/>
            </div>
            <img :src="personalInfo.avatar" alt="" style="width:180px;height: 180px"/>
          </div>
        </a-upload>

      </a-col>

    </a-row>
  </div>
</template>

<script>
import {getPersonalInfo, updatePersonalInfo} from "@/api/account";

export default {
  name: "Profile",
  data() {
    return {
      personalInfo: {},
    }
  },
  methods: {
    updatePersonalInfo() {
      updatePersonalInfo(this.personalInfo).then(res => {
        this.$success({content: res.message})
        this.personalInfo = res.data
        this.$emit("personalInfoChange", {email: res.data.email, nickname: res.data.nickname, avatar: res.data.avatar})
      })
    },
    uploadAvatar(info) {
      if (info.file.status !== 'uploading') {
        if (info.file.response.status === 200)
          this.personalInfo.avatar = info.file.response.data;
      }
      if (info.file.status === 'done') {
        if (info.file.response.status === 200)
          this.$message.success(`${info.file.response.message},` + this.$t('views.profile.please-update-info'));
        else
          this.$message.error(`${info.file.response.message}, ${info.file.response.data}`);
      }
    },
    beforeUpload(file) {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.$message.error(this.$t('views.profile.img-format'));
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error(this.$t('views.profile.image-size'));
      }
      return isJpgOrPng && isLt2M;
    },
  },
  mounted() {
    console.log("x")
    getPersonalInfo().then(res => {
      this.personalInfo = res.data
      this.$emit("personalInfoChange", {email: res.data.email, nickname: res.data.nickname, avatar: res.data.avatar})
    })
  }

}
</script>

<style scoped>
.avatar-upload-wrapper {
  height: 200px;
  width: 100%;
}

.ant-upload-preview {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 180px;
  border-radius: 50%;
  box-shadow: 0 0 4px #ccc;
}

.ant-upload-preview .upload-icon {
  position: absolute;
  top: 0;
  right: 10px;
  font-size: 1.4rem;
  padding: 0.5rem;
  background: rgba(222, 221, 221, 0.7);
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.2);
}

.ant-upload-preview .mask {
  opacity: 0;
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  cursor: pointer;
  transition: opacity 0.4s;
}

.ant-upload-preview .mask:hover {
  opacity: 1;
}

.ant-upload-preview .mask i {
  font-size: 2rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -1rem;
  margin-top: -1rem;
  color: #d6d6d6;
}

.ant-upload-preview img, .ant-upload-preview .mask {
  width: 100%;
  max-width: 180px;
  height: 100%;
  border-radius: 50%;
  overflow: hidden;
}

</style>