<template>
  <div>
    <!-- 列表页面 -->
    <div class="container">
      <div class="header"><div class="title">全部任务</div></div>
      <el-row>
        <el-col :span="8" style="margin: 10px 0px" v-for="(item, index) in taskTypeVOs" :key="index">
          <div>
            <el-card class="box-card">
              <div slot="header" class="clearfix">
                <span style="font-size:20px">{{ item.task_type_name }}</span>
                <span style="color:#3963bc; font-size:12px"> 单题限制{{ item.task_over_time }}分钟 </span>
                <span style=" font-size:12px; margin-left:20px"> 可领取数量: {{ item.task_total }} 篇</span>
                <el-button style="float: right; padding: 3px 0" @click="drawTask(item)" type="text">领取</el-button>
              </div>
              <div style="font-size:16px;margin: 10px 0px;">
                <div>
                  字数要求：
                  <span style="color:#21ba45;"
                    >{{ item.task_words_min_length }} ~ {{ item.task_words_max_length }}</span
                  >
                  字
                </div>
              </div>
              <div style="font-size:16px;margin: 10px 0px;">
                <div>
                  原创度要求：
                  <span style="color:#21ba45;">{{ item.task_original }}</span>
                  %
                </div>
              </div>
              <div style="font-size:16px; margin-top:20px">
                <el-row type="flex" justify="space-between">
                  <el-col :span="6">
                    <el-button type="text" @click="open(item.task_require_info)">要求</el-button>
                  </el-col>
                  <el-col :span="6">
                    <el-button type="text" @click="open(item.task_example)">举例</el-button>
                  </el-col>
                  <el-col :span="6">
                    <!-- <el-button type="text" @click="open(item.task_require_info)">题目要求</el-button> -->
                  </el-col>
                </el-row>
                <el-dialog title="提示" :visible.sync="showBtu" width="30%" :before-close="handleClose">
                  <pre>{{ showMessage }}</pre>
                  <span slot="footer" class="dialog-footer">
                    <el-button @click="showBtu = false">取 消</el-button>
                    <el-button type="primary" @click="showBtu = false">确 定</el-button>
                  </span>
                </el-dialog>
              </div>
            </el-card>
          </div>
        </el-col>
        <div v-if="taskTypeVOs.length == 0">
          暂无任务
        </div>
      </el-row>
    </div>
  </div>
</template>

<script>
import task from '@/model/task'

export default {
  components: {},
  data() {
    return {
      taskTypeVOs: '',
      showBtu: false,
      showMessage: '',
    }
  },
  async created() {
    this.loading = true
    await this.getTasks()
    this.loading = false
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    open(str) {
      this.showBtu = true
      this.showMessage = str
    },
    async drawTask(item) {
      let type_id = item.type_id
      try {
        let res = await task.drawTaskByTaskType(type_id, this.$store.getters.user.id)

        if (res.code > 9999) {
          this.$message.error(res.message)
        } else {
          this.$message({
            message: res.message,
            type: 'success',
          })
        }

        // this.tableData = tasks
      } catch (error) {
        if (error.code > 9999) {
          this.$message.error(error.message)
          console.log(error)
        }
      }
    },
    async getTasks() {
      try {
        this.taskTypeVOs = await task.getTaskTypListVO()
        console.log(this.taskTypeVOs)

        // this.tableData = tasks
      } catch (error) {
        if (error.code > 9999) {
          this.$message.error('暂无任务')
        }
        console.log(error)
      }
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

  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: '';
  }
  .clearfix:after {
    clear: both;
  }

  .box-card {
    width: 480px;
  }
}
</style>
