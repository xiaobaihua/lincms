<template>
  <div>
    <!-- 列表页面 -->
    <div class="container" v-if="!showEdit">
      <div style="margin:10px">
        <el-date-picker
          v-model="value2"
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
        <!-- {{rulSelectList}} -->
        <el-select v-model="typeID" placeholder="选择类型">
          <el-option
            v-for="item in rulSelectList"
            :key="item.id"
            :label="item['task_type_name']"
            :value="item.id"
          ></el-option>
        </el-select>

        <el-button type="primary" @click="serachDate()" style="margin-left: 10px">搜索</el-button>

        <el-button type="primary" @click="exportExcel()" style="margin-left: 10px">导出</el-button>
        <div style="padding:10px">
          <el-tag type="success">共： {{ this.pagination.pageTotal }}</el-tag>
        </div>
      </div>
      <!-- 表格 -->
      <lin-table :tableColumn="tableColumn" :tableData="tableData" :pagination="pagination" ref="linTable"></lin-table>
    </div>

    <!-- 编辑页面 -->
    <!-- <TaskEdit v-else @editClose="editClose" :editTaskID="editTaskID"></TaskEdit> -->
  </div>
</template>

<script>
import task from '@/model/task'
import LinTable from '@/component/base/table/lin-table'
import TaskEdit from './TaskEdit'

export default {
  components: {
    LinTable,
    TaskEdit,
  },
  data() {
    return {
      value2: '',
      rulSelectList: [],
      typeID: '',
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
      // tab标签
      activeName: '0',
      pagination: {
        pageSize: 10,
        pageTotal: null,
      },
      tableColumn: [
        { prop: 'title', label: '问题名' },
        { prop: 'type_name', label: '任务类型' },
        { prop: 'update_time', label: '更新时间' },
        { prop: 'statue_name', label: '任务状态' },
      ],
      tableData: [],
      operate: [],
      showEdit: false,
      editTaskID: 1,
    }
  },
  async created() {
    this.$set(this.pagination, 'pageTotal', this.tableData.length) // 获取数据总条数
    const res = await task.getTaskTypeList()
    this.rulSelectList = res
  },
  methods: {
    exportExcel: function() {
      var _this = this
      require.ensure([], async () => {
        const { export_json_to_excel } = require('../../vendor/Export2Excel')
        const tHeader = ['类型名', '标题', '答案内容', '最后提交时间', '用户名'] //对应表格输出的title
        const filterVal = ['type_name', 'title', 'anw_content', 'anw_update_time', 'nickname'] // 对应表格输出的数据
        let taskIDs = []
        let datas = Array()
        for (var i = 0; i < _this.tableData.length; i++) {
          taskIDs.push(_this.tableData[i]['task_id'])
        }

        let answersRes = await task.getAnswersByTaskIDs({
          taskIDs: taskIDs,
        })
        for (var i = 0; i < _this.tableData.length; i++) {
          for (var j = 0; j < answersRes.length; j++) {
            console.log(_this.tableData[i].task_id, answersRes[j].anw_task_id)
            if (_this.tableData[i].task_id == answersRes[j].anw_task_id) {
              datas.push({
                // "任务类型"
                type_name: _this.tableData[i].type_name,
                title: _this.tableData[i].title,
                anw_content: answersRes[j].anw_content,
                anw_update_time: _this.moment(answersRes[j].anw_update_time).format('YYYY-MM-DD HH:mm:ss'),
                nickname: answersRes[j].nickname,
              })
            }
          }
        }
        console.log(datas)
        const exceldata = this.formatJson(filterVal, datas)
        export_json_to_excel(tHeader, exceldata, _this.moment(new Date()).format('YYYY-MM-DD HH:mm:ss')) //对应下载文件的名字
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },
    currentChange(page) {
      console.log(page)
    },
    async serachDate() {
      let tasks = await task.getTaskByDate(this.value2, this.typeID, this.$store.getters.user.id)
      for (var t in tasks) {
        tasks[t].update_time = this.moment(tasks[t].update_time).format('YYYY-MM-DD HH:mm')
      }

      this.tableData = tasks
      this.$set(this.pagination, 'pageTotal', this.tableData.length) // 获取数据总条数
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
