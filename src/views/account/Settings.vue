<template>
<div>
  <a-row :gutter="16">
    <a-col>
      <a-form layout="vertical">
        <a-form-item >
          <span>账号状态：正常</span>
        </a-form-item>
        <a-form-item label="原密码">
          <a-input type="password"></a-input>
        </a-form-item>
        <a-form-item label="新密码">
          <a-input type="password"></a-input>
        </a-form-item>
        <a-form-item label="重复新密码">
          <a-input type="password"></a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="submit">修改密码</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</div>
</template>

<script>
export default {
  name: "Settings"
}
</script>

<style scoped>

</style>