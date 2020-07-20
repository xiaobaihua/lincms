<template>
  <div class="container">
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item>
              <el-button type="success" @click="submitForm(1)">通过</el-button>
              <el-button type="warning" @click="submitForm(2)">不通过</el-button>
            </el-form-item>

            <el-form-item label="标题">
              <el-input :disabled="true" size="medium" v-model="form.title" placeholder="请填写任务题目"></el-input>
            </el-form-item>

            <el-form-item label="机审结果">
              <div style="color:red">
                {{ form.robot_info }}
              </div>
            </el-form-item>

            <el-form-item label="人审结果">
              <editor-bar v-model="detail" :isClear="isClear" @change="change"></editor-bar>
              <!-- <div style="color:red">
                {{form.manual_info}}
              </div> -->
            </el-form-item>

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

            <!-- <el-form-item class="submit">
              <el-button type="primary">提 交</el-button>
            </el-form-item> -->
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import task from '@/model/task'
import EditorBar from '@/component/Edit.vue'
export default {
  props: {
    editTaskID: {
      type: Number,
    },
  },
  components: {
    EditorBar,
  },
  async created() {
    this.form = await task.getCheckTaskByID(this.editTaskID)
    this.detail = this.form.manual_info
  },
  data() {
    return {
      isClear: false,
      detail: '',
      loading: false,
      form: {
        ans_content: null,
        manual_date: null,
        manual_info: null,
        robot_check_time: null,
        robot_info: null,
        task_id: null,
        title: null,
        username: null,
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
  },
  methods: {
    change(val) {
      this.form.manual_info = val
    },
    async submitForm(statue) {
      const res = await task.putCheckTask(this.form, statue)

      // this.$emit('editClose')
      // console.log(res.code)
      // console.log(window.MAX_SUCCESS_CODE)
      this.$message.success(`${res.message}`)
      this.$emit('editClose')
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
