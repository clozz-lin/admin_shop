<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
      <el-breadcrumb-item>角色详情</el-breadcrumb-item>
    </el-breadcrumb>

    <el-card>
      <el-row>
        <el-button type="primary">添加角色</el-button>
      </el-row>
      <el-table :data="rolelist" border stripe width="100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-row
              v-for="(item, index) in scope.row.children"
              :key="item.id"
              :class="['bdbottom', index === 0 ? 'bdtop' : '']"
              type="flex"
              justify="center"
              align="middle"
            >
              <el-col :span="5" class="flexCenterMiddle">
                <el-tag closable @close="removeRightById(scope.row, item.id)">
                  {{ item.authName }}
                </el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <el-row
                  v-for="(item2, i2) in item.children"
                  :class="[i2 === 0 ? '' : 'bdtop', 'flexCenterMiddle']"
                  :key="item2.id"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="removeRightById(scope.row, item2.id)"
                      >{{ item2.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <el-col :span="18">
                    <el-tag
                      v-for="(item3, i3) in item2.children"
                      :class="[i3 === 0 ? '' : '']"
                      type="warning"
                      :key="item3.id"
                      closable
                      @close="removeRightById(scope.row, item3.id)"
                    >
                      {{ item3.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column prop="authName" label="操作" width="300">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="showEditDialog(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
              >删除</el-button
            >

            <el-button
              type="warning"
              icon="el-icon-setting"
              size="mini"
              @click="showSetRightDialog(scope.row)"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配权限 -->
    <el-dialog
      title="分配权限"
      :visible.sync="showSetRightDialogVisible"
      width="50%"
      @close="closeSetRightDialog"
    >
      <el-tree
        :data="rightlists"
        :props="treeProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="defKeys"
        ref="treeRef"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showSetRightDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="allotRights">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rolelist: [],
      showSetRightDialogVisible: false,
      rightlists: [],
      treeProps: {
        children: 'children',
        label: 'authName'
      },
      defKeys: [],
      roleId: ''
    }
  },
  created() {
    this.getRoleLists()
  },
  methods: {
    async getRoleLists() {
      const res = await this.$http.get('roles')
      console.log(res)
      if (res.data.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      }
      this.rolelist = res.data.data
      //   this.$message.success('获取用户列表成功')
      console.log(this.rolelist)
    },
    removeRightById(role, rightId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const { data: res } = await this.$http.delete(
            `roles/${role.id}/rights/${rightId}`
          )
          if (res.meta.status !== 200) {
            return this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
          //   this.getRoleLists()
          role.children = res.data
          this.$message({
            type: 'success',
            message: '删除成功'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
          //   console.log(err)
        })
    },
    async showSetRightDialog(role) {
      this.roleId = role.id
      const { data: res } = await this.$http.get('rights/tree ')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限数据失败')
      }
      this.rightlists = res.data
      this.getLeadfKeys(role, this.defKeys)
      //   console.log(this.rightlists)
      this.showSetRightDialogVisible = true
    },
    getLeadfKeys(node, arr) {
      if (!node.children) {
        return arr.push(node.id)
      }
      node.children.forEach((item) => {
        this.getLeadfKeys(item, arr)
      })
    },
    closeSetRightDialog() {
      this.defKeys = []
    },
    async allotRights() {
      const keys = [
        ...this.$refs.treeRef.getCheckedKeys(),
        ...this.$refs.treeRef.getHalfCheckedKeys()
      ]
      const idStr = keys.join(',')

      const { data: res } = await this.$http.post(
        `roles/${this.roleId}/rights`,
        { rids: idStr }
      )
      console.log(keys)
      if (res.meta.status !== 200) {
        return this.$message.error('分配角色权限失败')
      }
      this.getRoleLists()
      this.$message.success('分配角色权限成功')
      this.showSetRightDialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-tag {
  margin: 7px;
  //   text-align: center !important;
}

.bdtop {
  border-top: 1px solid #eee;
  //   background-color: red;
  //   font-weight: 700;
}
.bdbottom {
  border-bottom: 1px solid #eee;
  //   background-color: blue;
}
.flexCenterMiddle {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
