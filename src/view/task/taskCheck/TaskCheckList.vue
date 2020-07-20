<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <!-- <el-select v-model="val" @change ="change" placeholder="选中类型"> -->
      <div>
        <div style="display: flex; margin:5px">
          <div style="margin:5px">
            <!-- <el-select v-model="val" @change ="change" placeholder="选中类型"> -->
            <el-select v-model="val1" placeholder="选中类型">
              <el-option label="全部" value="0"></el-option>
              <el-option label="待审核" value="3"></el-option>
              <el-option label="已完成" value="6"></el-option>
              <el-option label="未通过" value="4"></el-option>
            </el-select>
          </div>
          <div style="margin:5px">
            <el-select v-model="val4" placeholder="选择类型">
              <el-option
                v-for="item in rulSelectList"
                :key="item.id"
                :label="item['task_type_name']"
                :value="item.id"
              ></el-option>
            </el-select>
          </div>
          <div style="margin:5px">
            <el-date-picker
              v-model="val2"
              type="daterange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="timestamp"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </div>
          <div style="margin:5px">
            <el-input v-model="val3" placeholder="请输入内容"></el-input>
          </div>
          <div style="margin:5px; margin-top:10px">
            <el-button type="primary" @click="search()">搜索</el-button>
          </div>
        </div>
      </div>
      <!-- 表格 -->
      <lin-table
        :tableColumn="tableColumn"
        :tableData="tableData"
        :operate="operate"
        :type="type"
        :index="index"
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
import TaskTypeEdit from './TaskCheckAnswerAddIssue'

export default {
  components: {
    LinTable,
    TaskTypeEdit,
    // TaskTypeEdit,
  },
  data() {
    return {
      val3: '',
      val4: '',
      rulSelectList: [],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            },
          },
          {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            },
          },
        ],
      },
      val2: '',
      val1: '',
      stateID: 0,
      // tab标签
      type: 'selection',
      index: 'index',
      pagination: {
        pageSize: 10,
        pageTotal: null,
      },
      tableColumn: [
        { prop: 'title', label: '问题名' },
        { prop: 'username', label: '提交用户名' },
        { prop: 'anw_content', label: '提交内容' },
        { prop: 'robot_info', label: '机审内容' },
        { prop: 'robot_check_time_stamp', label: '机审时间' },
        { prop: 'manual_date_stamp', label: '人审时间' },
        { prop: 'status_name', label: '状态' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editTaskID: 1,
    }
  },
  async created() {
    this.loading = true
    const res = await task.getTaskTypeList()
    this.rulSelectList = res
    await this.getTaskTypes()
    this.operate = [
      { name: '查看', func: 'handleEdit', type: 'primary' },
      {
        name: '通过',
        func: 'handleDelete',
        type: 'danger',
      },
    ]
    this.loading = false

    this.$set(this.pagination, 'pageTotal', this.tableData.length) // 获取数据总条数
  },
  methods: {
    currentChange(page) {
      console.log(page)
    },
    async change() {
      this.stateID = this.val
      this.getTaskTypes()
    },
    async getTaskTypes() {
      try {
        const tasks = await task.getCheckTaskList(this.stateID)
        this.tableData = tasks

        // 格式化日期
        for (var t in tasks) {
          tasks[t].robot_check_time_stamp = this.moment(tasks[t].robot_check_time).format('YYYY-MM-DD HH:mm')
          tasks[t].manual_date_stamp = this.moment(tasks[t].manual_date).format('YYYY-MM-DD HH:mm')
        }
      } catch (error) {
        if (error.code === 10020) {
          this.tableData = []
        }
        console.log(error)
      }
    },
    async search() {
      let res = await task.searchCheckTaskList({
        statuesID: this.val1,
        date1: this.val2[0],
        date2: this.val2[1],
        keyWord: this.val3,
        typeID: this.val4,
      })

      if (!res) {
        this.tableData = []
      } else {
        this.tableData = res
      }
    },
    handleEdit(val) {
      this.showEdit = true
      this.editTaskID = val.row['task_id']
    },
    async handleDelete(val) {
      console.log(val)
      // val.row.manual_date = this.moment(val.row.manual_date).valueOf()
      // val.row.robot_check_time = this.moment(val.row.robot_check_time).valueOf()

      let res = await task.putCheckTask(val.row, 1)
      if (res.code < 9999) {
        this.$message({
          message: res.message,
          type: 'success',
        })

        val.row.status_name = '已完成'
      }
    },
    rowClick() {
      console.log(123)
    },
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
