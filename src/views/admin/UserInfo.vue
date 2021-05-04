<template>
  <div>
    <a-table :columns="columns" :data-source="data" rowKey="id">
      <a slot="avatar" slot-scope="d">
        <a-avatar :src="d"></a-avatar>
      </a>
      <template slot="roleInfo" scope="v, record">
        <a-button @click="showRoles(record)">权限管理</a-button>
      </template>
      <template slot="detailInfo" scope="v, record">
        <a-button @click="showInfo(record)">个人资料</a-button>
      </template>
      <template slot="disableAccount" scope="v, record">
        <a-popconfirm :title="v===1?'确认要禁用账户吗？':'确认要启用账户吗？'" @confirm="() => enableUser(record)">
          <a-button>{{ v === 1 ? '禁用' : '启用' }}</a-button>
        </a-popconfirm>
      </template>
    </a-table>

    <a-drawer width="400" placement="right" :closable="false" :visible="drawer" @close="drawer=false">
      <a-card>
        <template slot="title">
          <a-avatar size="large" :src="currentRecord.avatar"></a-avatar>
          <span class="h3 m-3">{{currentRecord.nickname}}</span>
        </template>
        <br>
        <span class="font-weight-bold">用户名</span>
        <p>{{ currentRecord.username }}</p>
        <span class="font-weight-bold">状态</span>
        <p>{{ currentRecord.enabled ? '未封禁' : '已封禁' }}</p>
        <span class="font-weight-bold">昵称</span>
        <p>{{ currentRecord.nickname }}</p>
        <span class="font-weight-bold">真实姓名</span>
        <p>{{ currentRecord.realname }}</p>
        <span class="font-weight-bold">邮箱</span>
        <p>{{ currentRecord.email }}</p>
        <span class="font-weight-bold">爱好</span>
        <p>{{ currentRecord.hobby }}</p>
        <span class="font-weight-bold">QQ</span>
        <p>{{ currentRecord.qq }}</p>
        <span class="font-weight-bold">手机</span>
        <p>{{ currentRecord.phone }}</p>
        <span class="font-weight-bold">工作</span>
        <p>{{ currentRecord.job }}</p>
        <span class="font-weight-bold">个人介绍</span>
        <p>{{ currentRecord.intro }}</p>

      </a-card>
    </a-drawer>

    <a-drawer width="400" placement="right" :closable="false" :visible="roleDrawer" @close="roleDrawer=false">
      <a-spin v-if="currentRoles === null"></a-spin>
      <a-card :title="currentRecord.nickname + '的操作权限'">
        <a-list>
          <a-list-item v-for="role in currentRoles" :key="role.userid + ' ' + role.roleid">
            <a-tag closable @close="removeRole(role.roleid)">{{roleName[role.roleid]}}</a-tag>
            <span class="small float-right">授予时间： {{role.createtime}}</span>
          </a-list-item>
        </a-list>
      </a-card>
      <span style="font-weight: bold">授予权限</span>
      <a-select v-model="selectedRole" class="m-3">
        <a-select-option :value="1">评论权限</a-select-option>
        <a-select-option :value="2">发帖权限</a-select-option>
        <a-select-option :value="3">互动权限</a-select-option>
      </a-select>
      <a-button class="m-3" type="primary" @click="addRole">授予</a-button>
    </a-drawer>
  </div>
</template>
<script>
import {getAllUser, setUserEnable, getUserRoles, removeRole, addRole} from "@/api/admin";

const columns = [
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
    dataIndex: 'enabled',
    title: '操作',
    scopedSlots: {customRender: 'disableAccount'}
  },
  {
    dataIndex: 'username',
    key: 'xx',
    title: '详细信息',
    scopedSlots: {customRender: 'detailInfo'}
  },
  {
    dataIndex: 'username',
    key: 'yy',
    title: '权限管理',
    scopedSlots: {customRender: 'roleInfo'}
  }
];
const roleName = ["", "评论权限", "发帖权限", "互动权限"]

export default {
  methods: {
    enableUser(record) {
      record.enabled = (record.enabled === 1 ? 0 : 1)
      setUserEnable(record.id, record.enabled ).then(res => {
        this.$message.info(res.message);
        if (res.status !== 200)
          record.enabled = (record.enabled === 1 ? 0 : 1)
      })
    },
    showInfo(record) {
      this.currentRecord = record;
      this.drawer = true
    },
    showRoles(record) {
      this.currentRecord = record;
      this.roleDrawer = true;
      this.currentRoles = [];
      getUserRoles(record.id).then(res => {
        this.currentRoles = res.data
      })
    },
    addRole() {
      for (let i = 0;i<this.currentRoles.length;i++) {
        if (this.currentRoles[i].roleid == this.selectedRole) {
          this.$message.error("已拥有该权限");
          return;
        }
      }
      addRole(this.currentRecord.id, this.selectedRole).then(res => {
        this.$message.info(res.message);
        getUserRoles(this.currentRecord.id).then(res => {
          this.currentRoles = res.data
        })
      })
    },
    removeRole(roleId) {
      removeRole(this.currentRecord.id, roleId).then(res => {
        this.$message.info(res.message);
        getUserRoles(this.currentRecord.id).then(res => {
          this.currentRoles = res.data
        })
      })
    }
  },
  data() {
    return {
      data: [],
      columns,
      drawer: false,
      roleDrawer: false,
      currentRecord: {}, // 当前用户
      currentRoles: null, // 当前用户的权限
      roleName, // 权限id 与 权限名对应
      selectedRole: 1 // 添加权限时的下拉框绑定值
    };
  },
  mounted() {
    getAllUser().then(res => {
      this.data = res.data
    })
  }
};
</script>