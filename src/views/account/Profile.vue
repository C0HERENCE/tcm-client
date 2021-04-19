<template>
  <div>
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form layout="vertical">
          <a-form-item
              label="昵称"
          >
            <a-input placeholder="请输入昵称"/>
          </a-form-item>
          <a-form-item

              label="真实姓名"
          >
            <a-input placeholder="张三"/>
          </a-form-item>

          <a-form-item
              label="邮箱"
              :required="false"
          >
            <a-input placeholder="example@tcm.com"/>
          </a-form-item>

          <a-form-item
              label="QQ"
              :required="false"
          >
            <a-input placeholder="常用QQ号"/>
          </a-form-item>

          <a-form-item
              label="手机"
              :required="false"
          >
            <a-input placeholder="常用手机号"/>
          </a-form-item>


          <a-form-item
              label="个人介绍"
          >
            <a-textarea rows="4" placeholder="可在此作简短的个人介绍"/>
          </a-form-item>

          <a-form-item>
            <a-button type="primary">更新个人信息</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)">
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus"/>
          </div>
          <img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt=""/>
        </div>
      </a-col>

    </a-row>

    <avatar-modal ref="modal" @ok="setavatar"/>
  </div>
</template>

<script>
import AvatarModal from './AvatarModal'

export default {
  name: "Profile",
  components: {
    AvatarModal
  },
  data() {
    return {
      // cropper
      preview: {},
      option: {
        img: '/avatar2.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      }
    }
  },
  methods: {
    setavatar(url) {
      this.option.img = url
    }
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