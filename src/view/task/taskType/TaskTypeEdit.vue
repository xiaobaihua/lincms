<template>
  <div class="container">
    <div class="title">
      <span>修改规则</span> <span class="back" @click="back"> <i class="iconfont icon-fanhui"></i> 返回 </span>
    </div>
    <el-divider></el-divider>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <el-form :model="form" status-icon ref="form" label-width="200px" @submit.native.prevent>
            <el-form-item label="任务类型名" prop="task_type_name">
              <el-input size="medium" v-model="form.task_type_name" placeholder="任务类型名"></el-input>
            </el-form-item>
            <el-form-item label="任务单次价格" prop="task_price">
              <el-input size="medium" v-model="form.task_price" placeholder="任务单次价格"></el-input>
            </el-form-item>
            <el-form-item label="任务要求" prop="task_require_info">
              <el-input type="textarea" autosize placeholder="任务要求" v-model="form.task_require_info"> </el-input>
            </el-form-item>
            <el-form-item label="任务原创度(%)" prop="task_original">
              <el-input size="medium" v-model.number="form.task_original" placeholder="任务原创度(%)"></el-input>
            </el-form-item>
            <el-form-item label="任务实示例" prop="task_example">
              <el-input type="textarea" autosize placeholder="任务实示例" v-model="form.task_example"> </el-input>
            </el-form-item>
            <el-form-item label="任务单次获取数" prop="task_get_max">
              <el-input size="medium" v-model="form.task_get_max" placeholder="任务单次获取数"></el-input>
            </el-form-item>
            <el-form-item label="同类型最多存在多少待完成任务" prop="task_user_max">
              <el-input
                size="medium"
                v-model="form.task_user_max"
                placeholder="同类型最多存在多少待完成任务"
              ></el-input>
            </el-form-item>
            <el-form-item label="任务过期时间(单次领取数量*该数)分钟" prop="task_over_time">
              <el-input
                size="medium"
                v-model="form.task_over_time"
                placeholder="任务过期时间(单次领取数量*该数)分钟"
              ></el-input>
            </el-form-item>
            <el-form-item label="最大字数" prop="task_words_max_length">
              <el-input size="medium" v-model="form.task_words_max_length" placeholder="最大字数"></el-input>
            </el-form-item>
            <el-form-item label="最小字数" prop="task_words_min_length">
              <el-input size="medium" v-model="form.task_words_min_length" placeholder="最小字数"></el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">保 存</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form>
          <!-- <el-form :model="form" status-icon ref="form" label-width="200px" @submit.native.prevent>
            <el-form-item label="任务类型名" prop="task_type_name">
              <el-input size="medium" v-model="form.task_type_name" placeholder="任务类型名"></el-input>
            </el-form-item>
            <el-form-item label="任务单次价格" prop="task_price">
              <el-input size="medium" v-model="form.task_price" placeholder="任务单次价格"></el-input>
            </el-form-item> 
            <el-form-item label="任务要求" prop="task_require_info">
              <el-input
                type="textarea"
                autosize
                placeholder="任务要求"
                v-model="form.task_require_info">
              </el-input>
            </el-form-item> 
            <el-form-item label="任务原创度(%)" prop="task_original">
              <el-input size="medium" v-model.number="form.task_original" placeholder="任务原创度(%)"></el-input>
            </el-form-item> 
            <el-form-item label="任务实示例" prop="task_example">
              <el-input
                type="textarea"
                autosize
                placeholder="任务实示例"
                v-model="form.task_example">
              </el-input>
            </el-form-item> 
            <el-form-item label="任务单次获取数" prop="task_get_max">
              <el-input size="medium" v-model="form.task_get_max" placeholder="任务单次获取数"></el-input>
            </el-form-item> 
            <el-form-item label="同类型最多存在多少待完成任务" prop="task_user_max">
              <el-input size="medium" v-model="form.task_user_max" placeholder="同类型最多存在多少待完成任务"></el-input>
            </el-form-item>
            <el-form-item label="任务过期时间(单次领取数量*该数)分钟" prop="task_over_time">
              <el-input size="medium" v-model="form.task_over_time" placeholder="任务过期时间(单次领取数量*该数)分钟"></el-input>
            </el-form-item>
            <el-form-item label="最大字数" prop="task_words_max_length">
              <el-input size="medium" v-model="form.task_words_max_length" placeholder="最大字数"></el-input>
            </el-form-item>
            <el-form-item label="最小字数" prop="task_words_min_length">
              <el-input size="medium" v-model="form.task_words_min_length" placeholder="最小字数"></el-input>
            </el-form-item>

            <el-form-item class="submit">
              <el-button type="primary" @click="submitForm('form')">提 交</el-button>
              <el-button @click="resetForm('form')">重 置</el-button>
            </el-form-item>
          </el-form> -->
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
  async created() {},
  data() {
    return {
      loading: false,
      form: {
        // task_get_max: '',
        // task_user_max: '',
        // task_type_name: '',
        // task_over_time: '',
        // task_words_max_length: '',
        // task_words_min_length: '',
        task_get_max: '',
        task_user_max: '',
        task_type_name: '',
        task_over_time: '',
        task_words_max_length: '',
        task_words_min_length: '',
        task_price: null,
        task_require_info: '',
        task_original: null,
        task_example: '',
      },
    }
  },
  async mounted() {
    this.loading = true
    this.form = await task.getTaskTypeByID(this.editTaskID)
    this.loading = false
  },
  methods: {
    async submitForm() {
      const res = await task.editTaskType(this.editTaskID, this.form)
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
