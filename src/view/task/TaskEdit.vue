<template>
  <div class="container">
    <div class="title">
      <span>修改图书</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <!-- <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="书名" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写书名"></el-input>
            </el-form-item>
            <el-form-item label="作者" prop="author">
              <el-input size="medium" v-model="form.author" placeholder="请填写作者"></el-input>
            </el-form-item>
            <el-form-item label="封面" prop="image">
              <el-input size="medium" v-model="form.image" placeholder="请填写封面地址"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="summary">
              <el-input size="medium" type="textarea" :rows="4" placeholder="请输入简介" v-model="form.summary">
              </el-input>
            </el-form-item>
            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form> -->
          <el-form :model="form" status-icon ref="form" label-width="100px" v-loading="loading" @submit.native.prevent>
            <el-form-item label="标题" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写任务题目"></el-input>
            </el-form-item>
            <el-form-item label="选择规则" prop="rule">
              <el-select v-model="form.rule_id" placeholder="选择规则">
                <el-option
                  v-for="item in rulSelectList"
                  :key="item.id"
                  :label="item['task_type_name']"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择状态" prop="status">
              <el-select v-model="form.statue" placeholder="选择状态">
                <el-option
                  v-for="item in statusSelectList"
                  :key="item.id"
                  :label="item['name']"
                  :value="item.id"
                ></el-option>
              </el-select>
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
  props: {
    editTaskID: {
      type: Number,
    },
  },
  async created() {
    const res = await task.getTaskTypeList()
    this.rulSelectList = res

    const res1 = await task.getTaskAllStatus()
    this.statusSelectList = res1
  },
  data() {
    return {
      loading: false,
      form: {
        title: '',
        rule_id: '',
        status: '',
      },
      rulSelectList: [],
      statusSelectList: [],
    }
  },
  async mounted() {
    this.loading = true
    console.log(this.editTaskID)
    this.form = await task.getTask(this.editTaskID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await task.editTask(this.editTaskID, this.form)
      if (res.code < window.MAX_SUCCESS_CODE) {
        this.$message.success(`${res.message}`)
        this.$emit('editClose')
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
