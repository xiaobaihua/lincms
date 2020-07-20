<template>
  <div class="container">
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="标题">
              <el-input :disabled="true" size="medium" v-model="form.title" placeholder="请填写任务题目"></el-input>
            </el-form-item>

            <!-- <el-form-item label="年龄">
              <el-input v-model="form.anw_age" placeholder="年龄"></el-input>
            </el-form-item>

            <el-form-item label="性别">
              <el-radio-group v-model="form.anw_sex">
                <el-radio label="0">男</el-radio>
                <el-radio label="1">女</el-radio>
              </el-radio-group>
            </el-form-item> -->

            <el-form-item label="答案">
              <el-input
                type="textarea"
                :autosize="{ minRows: 10, maxRows: 4 }"
                placeholder="请输入内容"
                show-word-limit
                maxlength="3000"
                v-model="form.anw_content"
              >
              </el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">提 交</el-button>
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
  props: {
    editTaskID: {
      type: Number,
    },
  },
  components: {},
  async created() {
    const res = await task.getAllTaskRule()
    this.rulSelectList = res

    const res1 = await task.getTaskAllStatus()
    this.statusSelectList = res1
  },
  data() {
    return {
      loading: false,
      form: {
        user_id: '',
        anw_task_id: '',
        title: '',
        anw_sex: '',
        anw_age: '',
        anw_content: '',
      },
      rulSelectList: [],
      statusSelectList: [],
    }
  },
  async mounted() {
    this.loading = true
    let res1 = await task.getTask(this.editTaskID)

    this.form['anw_task_id'] = this.editTaskID
    this.form.title = res1['title']
    this.form.user_id = this.$store.getters.user['id']
    this.loading = false

    console.log(this.form)
  },
  methods: {
    change(val) {
      console.log(val)
    },
    async submitForm() {
      const res = await task.createAnswer(this.form)
      console.log(res.code)
      console.log(window.MAX_SUCCESS_CODE)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
      } else {
        this.$message.error(`${res.message}`)
      }
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    back() {
      this.$emit('editClose')
    },
  },
}
</script>

<style lang="scss" scoped>
.el-divider--horizontal {
  margin: 0;
}

.container {
  .title {
    height: 59px;
    line-height: 59px;
    color: $parent-title-color;
    font-size: 16px;
    font-weight: 500;
    text-indent: 40px;

    .back {
      float: right;
      margin-right: 40px;
      cursor: pointer;
    }
  }

  .wrap {
    padding: 20px;
  }

  .submit {
    float: left;
  }
}
</style>
