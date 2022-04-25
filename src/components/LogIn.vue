<template>
  <div class="login">
    <el-form
      :rules="rules"
      ref="formRef"
      :model="loginForm"
      label-width="0px"
      class="form-wrapper"
    >
      <div class="header">login</div>
      <div class="input-wrapper">
        <el-form-item class="border-wrapper" prop="username">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入用户名"
            class="border-item"
          ></el-input>
        </el-form-item>
        <el-form-item class="border-wrapper" prop="password">
          <el-input
            prefix-icon="el-icon-s-goods"
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            class="border-item"
          ></el-input>
        </el-form-item>
      </div>

      <div class="box">
        <el-form-item class="action">
          <div class="btn" @click="login">login</div>
        </el-form-item>
        <el-button type="primary" @click="resetForm">重置</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      loginForm: {
        username: 'admin',
        password: '123456'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    login() {
      this.$refs.formRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginForm)
        console.log(res)

        if (res.meta.status !== 200) return this.$message.success('登录失败')
        this.$message.success('登录成功')

        // window.sessionStorage.setItem('token', res.data.token)
        this.$router.push('/home')
      })
    },
    resetForm() {
      this.$refs.formRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  background-color: #0e92b3;
  height: 100%;
}
.form-wrapper {
  width: 300px;
  background-color: rgb(41, 45, 62);
  color: #fff;
  border-radius: 2px;
  padding: 50px;
  font-family: 'JetBrains Mono Medium';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.form-wrapper .header {
  text-align: center;
  font-size: 35px;
  text-transform: uppercase;
  line-height: 100px;
}

.form-wrapper .input-wrapper .border-wrapper .border-item {
  height: calc(100% - 4px) !important;

  width: calc(100% - 4px);
  border-radius: 30px;
}

.form-wrapper .action .btn {
  width: 250%;
  text-transform: uppercase;
  border: 2px solid #0e92b3;
  text-align: center;
  line-height: 50px;
  border-radius: 30px;
  cursor: pointer;
  transition: 0.2s;
}

.form-wrapper .action .btn:hover {
  background-color: #0e92b3;
}

.el-form-item__content {
  width: 100%;
}

.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .el-button {
    height: 60%;
    border-radius: 30px;
    margin-bottom: 20px;
  }
}
</style>
