<template>
  <div>
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" tab="管理员操作日志">
        <a-table :columns="adminColumns" :data-source="adminData">

        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2" tab="交流讨论帖子统计" force-render>
        <div>
          <a-statistic v-for="(i, j) in st" :title="j" :key="j" :value="i" />
        </div>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {getAdminStatistics, getForumStatistics} from "@/api/admin";

export default {
  name: "StatisticsInfo",
  mounted() {
    getAdminStatistics().then(res => this.adminData = res.data)
    getForumStatistics().then(res => this.st = res.data)
  },
  data() {
    return {
      adminData: [],
      adminColumns: [
        {
          title: '操作者',
          dataIndex: 'adminusername',
          key: 'adminusername',
        },
        {
          title: '时间',
          dataIndex: 'createtime',
          key: 'createtime',
        },
        {
          title: '执行操作',
          dataIndex: 'methodname',
          key: 'methodname',
        },

        {
          title: '参数',
          dataIndex: 'args',
          key: 'args',
        }
      ],
      st: {}
    }
  },
}
</script>

<style scoped>

</style>