<template>
  <div>
    <a-table :columns="columns" :data-source="data" size="middle" rowkey="id">
      <a slot="avatar" slot-scope="d">
        <a-avatar :src="d"></a-avatar>
      </a>
      <template slot="roleInfo" scope="v, record">
        <a-button @click="showRoles(record)">权限管理</a-button>
      </template>
    </a-table>
    <a-drawer width="60%" placement="right" :closable="false" :visible="roleDrawer" @close="roleDrawer=false">
      <a-spin v-if="currentRoles === null"></a-spin>
      <a-card :title="currentRecord.nickname + '的操作权限'" style="height: 700px">
        <a-transfer :titles="['可选权限', '已有权限']" :data-source="rolesSource" :targetKeys="targetRoles"
                    @change="addRoles" :render="item => item.description" style="height: 700px;"></a-transfer>
      </a-card>
    </a-drawer>
  </div>
</template>

<script>
import {getAllAdmins, getAdminRolesById, setRoles} from "@/api/admin";

export default {
  name: "AdminInfo",
  mounted() {
    getAllAdmins().then(res => this.data = res.data)
  },
  data() {
    return {
      rolesSource: [
        {key: 'ROLE_comment', description: "评论权限"},
        {key: 'ROLE_post', description: "发布权限"},
        {key: 'ROLE_action', description: "互动权限"},
        {key: 'ROLE_knowledgeAdmin', description: "知识库管理员"},
        {key: 'ROLE_forumAdmin', description: "论坛管理员"},
        {key: 'ROLE_userAdmin', description: "用户管理员"},
        {key: 'ROLE_feedbackAdmin', description: "反馈处理权限"},
        {key: 'ROLE_superAdmin', description: "超级管理员"},
      ],
      targetRoles: [],
      data: [],
      currentRecord: {},
      roleDrawer: false,
      currentRoles: [],
      columns: [
        {
          dataIndex: 'avatar', // 数据中对应的列
          title: '头像',
          scopedSlots: {customRender: 'avatar'}
        },
        {
          dataIndex: 'username',
          title: '登录名'
        },
        {
          dataIndex: 'nickname',
          title: '昵称'
        },
        {
          dataIndex: 'email',
          title: '个人邮箱'
        },
        {
          dataIndex: 'username',
          key: 'yy',
          title: '权限管理',
          scopedSlots: {customRender: 'roleInfo'}
        }
      ]
    }
  },
  methods: {
    addRoles(nextTargetKeys) {
      setRoles(this.currentRecord.id, nextTargetKeys).then(res => {
        if (res.status === 200) {
          this.$message.success(res.message);
          this.targetRoles = nextTargetKeys
        }
      })
    },

    showRoles(record) {
      this.currentRecord = record;
      this.roleDrawer = true;
      this.currentRoles = [];
      getAdminRolesById(record.id).then(res => {
        this.currentRoles = res.data
        console.log(res.data)
        this.targetRoles = res.data.map(x => x.rolename)
        console.log(this.targetRoles)
      })
    },
  },
}
</script>

<style scoped>

</style>