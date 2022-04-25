<template>
  <div class="home">
    <el-container>
      <el-header>
        <div>
          <img src="../assets/Avatar.jpg" alt="" />
          <span>后台管理系统</span>
        </div>
        <el-button type="primary" @click="quit">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="isCollapse ? '64px' : '200px'">
          <div class="toggle-button" @click="toggleCollapse">|||</div>
          <el-menu
            background-color="#ccc"
            text-color="blank"
            unique-opened
            router
            :collapse="isCollapse"
            :collapse-transition="false"
            :default-active="activePath"
          >
            <el-submenu
              :index="item.id + ''"
              v-for="item in menuLists"
              :key="item.id"
            >
              <template slot="title">
                <i :class="iconsObj[item.id]"></i>
                <span class="authName">{{ item.authName }}</span>
              </template>
              <el-menu-item
                :index="'/' + subItem.path"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="saveNavState('/' + subItem.path)"
              >
                <i class="el-icon-menu"></i>

                <span>{{ subItem.authName }}</span>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menuLists: [],
      isCollapse: false,
      iconsObj: {
        125: 'iconfont icon-user',
        103: 'iconfont icon-tijikongjian',
        101: 'iconfont icon-shangpin ',
        102: 'iconfont icon-danju ',
        145: 'iconfont icon-baobiao'
      },
      activePath: ''
    }
  },
  created() {
    this.getMenuList()
    // this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    quit() {
      // window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async getMenuList() {
      const res = await this.$http.get('menus')
      // console.log(res)
      // console.log(res)

      if (res.data.meta.status !== 200) {
        return this.$message.error('获取左侧菜单栏信息失败')
      }

      // console.log(res)
      this.menuLists = res.data.data
      // console.log(this.menuLists)
      // this.$message.success('获取左侧菜单栏信息成功')
    },
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style scoped lang="less">
.home {
  height: 100%;
}
.el-container {
  background-color: #fff;
  height: 100%;
}
.el-header {
  // height: 100%;
  background-color: #f5f5f5;
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  // padding-left: 0;
  div {
    display: flex;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      // background-color: rgb(83, 4, 4);
      margin-right: 24px;
    }
    span {
      color: rgb(17, 3, 3);
      font-size: 20px;
      letter-spacing: 0.1em;
      font-weight: 700;
    }
  }
}
.el-aside {
  background-color: #f5f5f5;
  margin-right: 5px;
}
.el-main {
  background-color: #f5f5f5;
}
.toggle-button {
  background-color: #4a5074;
  font-size: 10px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.authName {
  margin-left: 5px;
}
</style>
