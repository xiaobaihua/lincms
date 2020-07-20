<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="showEdit === 1">
      <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="草稿" name="2">
            <div class="header">
              <div class="title">草稿</div>
            </div>
            <!-- 表格 -->
            <lin-table
              :tableColumn="tableColumn1"
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
          </el-tab-pane>
          <el-tab-pane label="审核中" name="3">
            <div class="header"><div class="title">审核中</div></div>
          </el-tab-pane>
          <el-tab-pane label="未通过" name="4">
            <div class="header">
              <div class="title">未通过</div>
            </div>
            <lin-table
              :tableColumn="tableColumn1"
              :tableData="tableData"
              :operate="operate1"
              @handleEdit="handleEdit2"
              @handleDelete="handleDelete"
              @row-click="rowClick"
              v-loading="loading"
              :pagination="pagination"
              @currentChange="currentChange"
            >
              ></lin-table
            >
          </el-tab-pane>
          <el-tab-pane label="已完成" name="6">
            <div class="header"><div class="title">已完成</div></div>
          </el-tab-pane>
          <!-- <el-tab-pane label="未完成" name="6">
            <div class="header"><div class="title">未完成</div></div>
          </el-tab-pane> -->
          <el-tab-pane label="全部任务" name="0">
            <div class="header"><div class="title">全部任务</div></div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- 表格 -->
      <lin-table
        v-show="activeName != 2 && activeName != 4"
        :tableColumn="tableColumn"
        :tableData="tableData"
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
    <Answer v-else-if="showEdit === 2" @editClose="editClose" :editTaskID="editTaskID"></Answer>
    <TaskCheckAnswer v-else-if="showEdit === 3" @editClose="editClose" :editTaskID="editTaskID"></TaskCheckAnswer>
  </div>
</template>

<script>
import task from '@/model/task'
import LinTable from '@/component/base/table/lin-table'
import Answer from './Answer'
import TaskCheckAnswer from './taskCheck/TaskCheckAnswer'

export default {
  components: {
    LinTable,
    Answer,
    TaskCheckAnswer,
  },
  data() {
    return {
      // tab标签
      activeName: '4',
      pagination: {
        pageSize: 10,
        pageTotal: null,
      },
      tableColumn1: [
        { prop: 'title', label: '问题名' },
        { prop: 'update_time', label: '领取时间' },
        { prop: 'over_time', label: '过期时间' },
        { prop: 'statue_name', label: '任务状态' },
      ],
      tableColumn: [
        { prop: 'title', label: '问题名' },
        { prop: 'update_time', label: '领取时间' },
        { prop: 'statue_name', label: '任务状态' },
      ],
      tableData: [],
      operate: [],
      operate1: [],
      showEdit: 1,
      editTaskID: 1,
    }
  },
  async created() {
    this.loading = true
    await this.getTasks()
    this.operate = [{ name: '开始答题', func: 'handleEdit', type: 'primary' }]
    this.operate2 = []
    this.operate1 = [{ name: '修改', func: 'handleEdit', type: 'primary' }]
    this.loading = false

    this.$set(this.pagination, 'pageTotal', this.tableData.length) // 获取数据总条数
  },
  methods: {
    currentChange(page) {
      console.log(page)
    },
    async getTasks() {
      try {
        const tasks = await task.getTaskListByUserID(this.$store.getters.user['id'], {
          statusID: this.activeName,
        })

        // 格式化日期
        for (var t in tasks) {
          tasks[t].update_time = this.moment(tasks[t].update_time).format('YYYY-MM-DD HH:mm')
          tasks[t].over_time = this.moment(tasks[t].over_time).format('YYYY-MM-DD HH:mm')
        }

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
      this.showEdit = 2
      this.editTaskID = val.row['task_id']
      console.log(this.editTaskID)
    },
    handleEdit2(val) {
      this.showEdit = 3
      this.editTaskID = val.row['task_id']
      console.log(this.editTaskID)
    },
    handleDelete(val) {
      this.$confirm('此操作将永久删除该任务, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        const res = await task.delectTask(val.row.id)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.getTasks()
          this.$message({
            type: 'success',
            message: `${res.message}`,
          })
        }
      })
    },
    rowClick() {},
    editClose() {
      this.showEdit = 1
      this.getTasks()
    },
    handleClick(tab, event) {
      this.getTasks()
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
