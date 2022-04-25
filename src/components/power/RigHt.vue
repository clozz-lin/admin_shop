<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
      <el-breadcrumb-item>权限详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-table :data="rightlist" style="width: 100%" border stripe>
        <el-table-column type="index"> </el-table-column>

        <el-table-column prop="authName" label="权限名称"> </el-table-column>
        <el-table-column prop="path" label="路径"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">标签一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
              >标签二</el-tag
            >
            <el-tag type="warning" v-else-if="scope.row.level === '2'"
              >标签三</el-tag
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightlist: []
    }
  },
  created() {
    this.getRightLists()
  },
  methods: {
    async getRightLists() {
      const res = await this.$http.get('rights/list')
      if (res.data.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.rightlist = res.data.data
      //   this.$message.success('获取用户列表成功')
      console.log(this.rightlist)
    }
  }
}
</script>

<style></style>
