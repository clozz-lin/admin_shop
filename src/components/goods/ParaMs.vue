<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-alert
        show-icon
        title="注意:只允许为第三级分类设置相关参数!"
        type="warning"
        :closable="false"
      >
      </el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类: </span>
          <el-cascader
            v-model="selectedCateValue"
            :options="cateList"
            :props="propCascader"
            @change="handleChange"
          ></el-cascader>
        </el-col>
      </el-row>
    </el-card>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">用户管理</el-tab-pane>
      <el-tab-pane label="静态属性" name="second">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cateList: [],
      selectedCateValue: [],
      propCascader: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      activeName: 'first'
    }
  },
  created() {
    this.getCate()
  },
  methods: {
    async getCate() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取商品分类失败')
      }
      this.cateList = res.data
      console.log(this.cateList)
    },
    handleChange() {
      console.log(this)
    },
    handleClick() {}
  }
}
</script>

<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
