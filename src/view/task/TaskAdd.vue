<template>
  <div class="container" v-loading.fullscreen.lock="fullscreenLoading">
    <div class="title">新建任务</div>
    <div class="wrap">
      <el-row>
        <el-col :lg="16" :md="20" :sm="24" :xs="24">
          <input
            style="display: none;"
            type="file"
            ref="input"
            @change="importf(this)"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          />

          <el-button style="margin-left: 23px;margin-bottom: 20px;" type="primary" @click="clickInput()"
            >导入</el-button
          >

          <el-form :model="form" status-icon ref="form" label-width="100px" @submit.native.prevent>
            <el-form-item label="标题" prop="title">
              <el-input size="medium" v-model="form.title" placeholder="请填写任务题目"></el-input>
            </el-form-item>
            <el-form-item label="选择规则" prop="typeID">
              <el-select v-model="form.typeID" placeholder="选择类型">
                <el-option
                  v-for="item in rulSelectList"
                  :key="item.id"
                  :label="item['task_type_name']"
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
  data() {
    return {
      form: {
        title: '',
        typeID: '',
      },
      rulSelectList: [],
      fullscreenLoading: false,
    }
  },
  async created() {
    const res = await task.getTaskTypeList()
    this.rulSelectList = res
    console.log(this.rulSelectList)
  },
  methods: {
    clickInput() {
      this.$refs.input.click()
    },
    async importf(obj) {
      let _this = this
      let inputDOM = this.$refs.inputer // 通过DOM取文件数据
      this.file = event.currentTarget.files[0]
      var rABS = false //是否将文件读取为二进制字符串
      var f = this.file
      var reader = new FileReader() //if (!FileReader.prototype.readAsBinaryString) {
      FileReader.prototype.readAsBinaryString = async function(f) {
        var binary = ''
        var rABS = false //是否将文件读取为二进制字符串
        var pt = this
        var wb //读取完成的数据
        var outdata
        var reader = new FileReader()
        reader.onload = async function(e) {
          var bytes = new Uint8Array(reader.result)
          var length = bytes.byteLength
          for (var i = 0; i < length; i++) {
            binary += String.fromCharCode(bytes[i])
          }
          var XLSX = require('xlsx')
          if (rABS) {
            wb = XLSX.read(btoa(fixdata(binary)), {
              //手动转化
              type: 'base64',
            })
          } else {
            wb = XLSX.read(binary, {
              type: 'binary',
            })
          } // outdata就是你想要的东西 excel导入的数据
          _this.fullscreenLoading = true
          outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]])
          let successTotal = 0
          let badTotal = 0
          for (var i = 0; i <= outdata.length; i++) {
            if (outdata[i]) {
              let res = await task.createTask({
                title: outdata[i].标题,
                typeID: outdata[i].任务类别,
              })
              if (res.code >= 9999) {
                badTotal += 1
              } else {
                successTotal += 1
              }
            }
          }

          _this.fullscreenLoading = false
          _this.$message({
            message: `成功${successTotal}, 失败${badTotal}`,
            type: 'success',
          }) // excel 数据再处理
          //         let arr = []
          //         outdata.map(v => {
          //              let obj = {}
          //              obj.account = v.登录账号
          //              obj.name = v.姓名
          //              obj.department = v.部门
          //              obj.secondDepartment = v.二级部门
          //              obj.status = v.状态
          //              obj.id = v.id
          //              arr.push(obj)
          //         })
          //         _this.accountList = [...arr];
          //         console.log( _this.accountList)
          _this.reload()
        }
        reader.readAsArrayBuffer(f)
      }
      if (rABS) {
        reader.readAsArrayBuffer(f)
      } else {
        reader.readAsBinaryString(f)
      }
    },
    async submitForm(formName) {
      try {
        const res = await task.createTask(this.form)
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
