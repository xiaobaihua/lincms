<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="全部类型" name="0">
            <div class="header"><div class="title">全部任务</div></div>
          </el-tab-pane>
          <el-tab-pane label="未领取" name="1">
            <div class="header"><div class="title">未领取</div></div>
          </el-tab-pane>
          <el-tab-pane label="审核中" name="3">
            <div class="header"><div class="title">审核中</div></div>
          </el-tab-pane>
          <el-tab-pane label="未通过" name="4">
            <div class="header"><div class="title">未通过</div></div>
          </el-tab-pane>
          <el-tab-pane label="已完成" name="5">
            <div class="header"><div class="title">已完成</div></div>
          </el-tab-pane>
          <el-tab-pane label="草稿" name="2">
            <div class="header"><div class="title">草稿</div></div>
          </el-tab-pane>
          <!-- <el-tab-pane label="未通过" name="3">未通过</el-tab-pane>
          <el-tab-pane label="已完成" name="4">已完成</el-tab-pane>
          <el-tab-pane label="未完成" name="5">未完成</el-tab-pane> -->
        </el-tabs>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        @handleEdit="handleEdit"
        @handleDelete="handleDelete"
        @row-click="rowClick"
        v-loading="loading"
        :pagination="pagination"
        @currentChange="currentChange"
      >
        ></lin-table
      >
    </div>

    <!-- 编辑页面 -->
    <TaskTypeEdit v-else @editClose="editClose" :editTaskID="editTaskID"></TaskTypeEdit>
  </div>
</template>

<script>
import task from '@/model/task'
import LinTable from '@/component/base/table/lin-table'
import TaskTypeEdit from './TaskTypeEdit'

export default {
  components: {
    LinTable,
    TaskTypeEdit,
  },
  data() {
    return {
      // tab标签
      activeName: '0',
      pagination: {
        pageSize: 10,
        pageTotal: null,
      },
      tableColumn: [
        { prop: 'id', label: 'id' },
        { prop: 'task_type_name', label: '规则名' },
        { prop: 'task_over_time', label: '过期时间' },
        { prop: 'task_user_max', label: '用户领取上限' },
        { prop: 'task_get_max', label: '用户单次领取数量' },
        { prop: 'task_words_max_length', label: '最大长度' },
        { prop: 'task_words_min_length', label: '最小长度' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editTaskID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getTaskTypes()
    this.operate = [
      { name: '编辑', func: 'handleEdit', type: 'primary' },
      {
        name: '删除',
        func: 'handleDelete',
        type: 'danger',
        permission: '删除规则',
      },
    ]
    this.loading = false

    this.$set(this.pagination, 'pageTotal', this.tableData.length) // 获取数据总条数
  },
  methods: {
    currentChange(page) {
      console.log(page)
    },
    async getTaskTypes() {
      try {
        const tasks = await task.getTaskTypeList()
        this.tableData = tasks
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
        console.log(error)
      }
    },
    handleEdit(val) {
      console.log('val', val)
      this.showEdit = true
      this.editTaskID = val.row['id']
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该规则, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await task.deleteTaskType(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getTaskTypes()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = false
      this.getTaskTypes()
    },
    handleClick(tab, event) {
      this.getTaskTypes()
      console.log(tab, event)
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 0 30px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title {
      height: 59px;
      line-height: 59px;
      color: $parent-title-color;
      font-size: 16px;
      font-weight: 500;
    }
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin: 20px;
  }
}
</style>
