<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row class="addCate">
        <el-button type="primary" @click="showAddCate">添加分类</el-button>
      </el-row>
      <tree-table
        :data="cateList"
        :columns="columns"
        show-index
        border
        :expand-type="false"
        :selection-type="false"
      >
        <template slot="isOk" slot-scope="scope">
          <i
            class="el-icon-success"
            v-if="scope.row.cat_deleted === false"
            style="color: lightgreen"
          ></i>
          <i class="el-icon-error" v-else style="color: red"></i>
        </template>

        <template slot="order" slot-scope="scope">
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag v-if="scope.row.cat_level === 1" type="success">二级</el-tag>
          <el-tag v-if="scope.row.cat_level === 2" type="warning">三级</el-tag>
        </template>

        <template slot="opt" slot-scope="">
          <el-button type="primary" icon="el-icon-edit" size="mini"
            >编辑</el-button
          >
          <el-button type="danger" icon="el-icon-delete" size="mini"
            >删除</el-button
          >
        </template>
      </tree-table>
    </el-card>

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[1, 5, 10, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>

    <!-- 添加分类对话框 -->
    <el-dialog
      title="添加分类"
      :visible.sync="addCateDialogVisible"
      width="50%"
    >
      <el-form
        :model="addCateForm"
        :rules="addCateRules"
        ref="addCateRef"
        label-width="100px"
      >
        <el-form-item label="分类名称：" prop="cat_name">
          <el-input v-model="addCateForm.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类：">
          <el-cascader
            v-model="selectedKeys"
            :options="parentCateLists"
            :props="cascaderProps"
            @change="handleChange"
            clearable
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateDialogVisible = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      queryInfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5
      },
      cateList: [],
      total: 0,
      columns: [
        {
          label: '分类名称',
          prop: 'cat_name',
          width: '400px'
        },
        {
          label: '是否有效',
          prop: 'likes',
          minWidth: '200px',
          type: 'template',
          template: 'isOk'
        },
        {
          label: '排序',
          prop: 'likes',
          minWidth: '200px',
          type: 'template',
          template: 'order'
        },
        {
          label: '操作',
          prop: 'likes',
          minWidth: '200px',
          type: 'template',
          template: 'opt'
        }
      ],
      addCateDialogVisible: false,
      addCateForm: {
        cat_name: '',
        cat_pid: 0,
        cat_level: 0
      },
      addCateRules: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' }
        ]
      },
      parentCateLists: [],
      cascaderProps: {
        expandTrigger: 'hover',
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      selectedKeys: []
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const res = await this.$http.get('categories')
      console.log(res)
      if (res.data.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.cateList = res.data
      this.total = res.data.data.total
      //   this.$message.success('获取用户列表成功')
      // console.log(res.data)
      // console.log(this.cateList)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCateList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCateList()
    },
    async getParentCateList() {
      const { data: res } = await this.$http.get('categories', {
        type: 2
      })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.parentCateLists = res.data
      //   this.total = res.data.total
      //   this.$message.success('获取用户列表成功')
      //   console.log(res)
      //   console.log(this.parentCateLists)
    },
    showAddCate() {
      this.getParentCateList()
      this.addCateDialogVisible = true
    },
    handleChange() {
      console.log(this.selectedKeys)
    }
  }
}
</script>

<style lang="less" scoped>
.addCate {
  margin-bottom: 15px;
}
.el-cascader {
  width: 100%;
}
</style>
