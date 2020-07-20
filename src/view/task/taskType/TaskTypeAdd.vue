<template>
  <div class="container">
    <div class="title">新建任务类型</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="200px" @submit.native.prevent>
            <el-form-item label="任务类型名" prop="taskTypeName">
              <el-input size="medium" v-model="form.taskTypeName" placeholder="任务类型名"></el-input>
            </el-form-item>
            <el-form-item label="任务单次价格" prop="taskPrice">
              <el-input size="medium" v-model="form.taskPrice" placeholder="任务单次价格"></el-input>
            </el-form-item>
            <el-form-item label="任务要求" prop="taskRequireInfo">
              <el-input type="textarea" autosize placeholder="任务要求" v-model="form.taskRequireInfo"> </el-input>
            </el-form-item>
            <el-form-item label="任务原创度(%)" prop="taskOriginal">
              <el-input size="medium" v-model.number="form.taskOriginal" placeholder="任务原创度(%)"></el-input>
            </el-form-item>
            <el-form-item label="任务实示例" prop="taskExample">
              <el-input type="textarea" autosize placeholder="任务实示例" v-model="form.taskExample"> </el-input>
            </el-form-item>
            <el-form-item label="任务单次获取数" prop="taskGetMax">
              <el-input size="medium" v-model="form.taskGetMax" placeholder="任务单次获取数"></el-input>
            </el-form-item>
            <el-form-item label="同类型最多存在多少待完成任务" prop="taskUserMax">
              <el-input size="medium" v-model="form.taskUserMax" placeholder="同类型最多存在多少待完成任务"></el-input>
            </el-form-item>
            <el-form-item label="任务过期时间(单次领取数量*该数)分钟" prop="taskOverTime">
              <el-input
                size="medium"
                v-model="form.taskOverTime"
                placeholder="任务过期时间(单次领取数量*该数)分钟"
              ></el-input>
            </el-form-item>
            <el-form-item label="最大字数" prop="taskWordsMaxLength">
              <el-input size="medium" v-model="form.taskWordsMaxLength" placeholder="最大字数"></el-input>
            </el-form-item>
            <el-form-item label="最小字数" prop="taskWordsMinLength">
              <el-input size="medium" v-model="form.taskWordsMinLength" placeholder="最小字数"></el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import task from '@/model/task'

export default {
  data() {
    return {
      form: {
        taskGetMax: '1',
        taskUserMax: '1',
        taskTypeName: '',
        taskOverTime: '5',
        taskWordsMaxLength: '300',
        taskWordsMinLength: '60',
        taskPrice: null,
        taskRequireInfo: '',
        taskOriginal: null,
        taskExample: '',
      },
    }
  },
  async created() {
    const res = await task.getAllTaskRule()
    this.rulSelectList = res
    console.log(this.rulSelectList)
  },
  methods: {
    async submitForm(formName) {
      try {
        const res = await task.createTaskType(this.form)
        if (res.code < window.MAX_SUCCESS_CODE) {
          this.$message.success(`${res.message}`)
          this.resetForm(formName)
        }
      } catch (error) {
        this.$message.error('任务添加失败，请检测填写信息')
        console.log(error)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;
    border-bottom: 1px solid #dae1ec;
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
