<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户管理" name="first"> 用户管理 </el-tab-pane>
        <el-tab-pane label="配置管理" name="second"> 配置管理 </el-tab-pane>
        <el-tab-pane label="角色管理" name="third"> 角色管理 </el-tab-pane>
        <el-tab-pane label="定时任务补偿" name="fourth"> 定时任务补偿 </el-tab-pane>
      </el-tabs>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: '',
    }
  },

  created() {},
  methods: {
    handleClick() {
      window.console.log(1123)
    },
  },
  components: {},
}
</script>
<style scoped></style>
