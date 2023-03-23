<template>
  <div v-if="$route.name == 'householderPrInfo'">
    <el-container class="app-content">
      <el-header class="app-header">
        <div class="app-header__left">
          <el-tooltip placement="bottom" :content="isCollapse ? '展开侧边栏' : '收起侧边栏'">
            <i class="iconfont icon-liebiao fs-28 cursor-pointer" @click="isCollapse=!isCollapse"></i>
          </el-tooltip>
        </div>
        <div class="app-header__center fs-20">个人信息查看</div>
        <div class="app-header__right cursor-pointer">
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="fs-18">退出登录</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="iconfont icon-tuichu" @click="$router.push({ name: 'login' })">退出登录</i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside
          class="app-aside"
          :width="isCollapse ? '64px' : '200px'"
          v-auto-windows-height="101"
        >
          <vue-scroll>
            <el-menu
              :default-active="$route.name"
              class="app-menu"
              :collapse="isCollapse"
              text-color="#485a6a"
              active-text-color="#5c9acf"
            >
              <el-menu-item index="householder">
                <i class="app-menu-icon iconfont icon-yonghuguanli"></i>
                <span>个人信息</span>
              </el-menu-item>
            </el-menu>
          </vue-scroll>
        </el-aside>
        <el-main>
          <section v-if="$route.name !== 'login'" class="app-page">
            <vue-scroll>
              <keep-alive>
                <router-view class="app-view" v-auto-windows-height="170">主窗体部分。。。。。。</router-view>
              </keep-alive>
            </vue-scroll>
          </section>
          <section v-else class="app-page app-login">
            <router-view></router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>


  
  <div v-else class="app">
    <el-container class="app-content">
      <el-header class="app-header">
        <div class="app-header__left">
          <el-tooltip placement="bottom" :content="isCollapse ? '展开侧边栏' : '收起侧边栏'">
            <i class="iconfont icon-liebiao fs-28 cursor-pointer" @click="isCollapse=!isCollapse"></i>
          </el-tooltip>
        </div>
        <div class="app-header__center fs-20">住户信息管理系统</div>
        <div class="app-header__right cursor-pointer">
          <el-dropdown :hide-on-click="false">
            <span class="el-dropdown-link">
              <i class="iconfont icon-denglu-copy fs-18">{{user.name}}</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <i class="iconfont icon-wodexinxi">我的信息</i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="iconfont icon-xiugaimima1">修改密码</i>
              </el-dropdown-item>
              <el-dropdown-item>
                <i class="iconfont icon-tuichu" @click="$router.push({ name: 'login' })">退出登录</i>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-header>
      <el-container>
        <el-aside
          class="app-aside"
          :width="isCollapse ? '64px' : '200px'"
          v-auto-windows-height="101"
        >
          <vue-scroll>
            <el-menu
              :default-active="$route.name"
              class="app-menu"
              :collapse="isCollapse"
              text-color="#485a6a"
              active-text-color="#5c9acf"
              router
            >
              <el-menu-item index="householder" :route="{ name: 'householderList' }">
                <i class="app-menu-icon iconfont icon-yonghuguanli"></i>
                <span slot="title">住户信息管理</span>
              </el-menu-item>
            </el-menu>
          </vue-scroll>
        </el-aside>
        <el-main>
          <section v-if="$route.name !== 'login'" class="app-page">
            <div class="app-page-header">
              <el-row class="app-page-header__row">
                <el-col :span="12">
                  <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>

                    <!-- 面包屑设置 -->
                    <!-- 三选一 -->
                    <!-- <el-breadcrumb-item v-if="$route.meta.title">
                      <router-link :to='{ name: keepAliveName[0].name }'>{{ $route.meta.title }}</router-link>
                    </el-breadcrumb-item>-->
                    <!-- <el-breadcrumb-item v-if="$route.meta.title">
                      <router-link to='/householder/list'>{{ $route.meta.title }}</router-link>
                    </el-breadcrumb-item>-->
                    <el-breadcrumb-item
                      v-if="$route.meta.title"
                      :to="{ path: '/householder/list', }"
                    >{{ $route.meta.title }}</el-breadcrumb-item>
                    <el-breadcrumb-item
                      v-if="$route.meta.breadcrumbTitle"
                    >{{ $route.meta.breadcrumbTitle }}</el-breadcrumb-item>
                  </el-breadcrumb>
                </el-col>
                <el-col :span="12" class="app-page-tools">
                  <div>
                    <span v-for="item in appPageTools" :key="item.content" class="mr-15">
                      <el-button
                        :type="item.type"
                        :icon="item.icon"
                        @click="item.callback"
                        size="mini"
                      >{{ item.content }}</el-button>
                    </span>
                  </div>
                </el-col>
              </el-row>
            </div>
            <vue-scroll>
              <keep-alive>
                <router-view class="app-view" v-auto-windows-height="170">主窗体部分。。。。。。</router-view>
              </keep-alive>
            </vue-scroll>
          </section>
          <section v-else class="app-page app-login">
            <router-view></router-view>
          </section>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>



<script>
import { mapState } from "vuex";
export default {
  name: "APP",
  data() {
    return {
      isCollapse: false, //默认不折叠显示收起侧边栏
      keepAliveName: [] //保存当前活动页面名称，设置面包屑...
    };
  },
  created() {
    this.initUser();
  },
  methods: {
    initUser() {
      const name = this.$cookie.get("name");
      const userType = this.$cookie.get("userType");
      const userUuid = this.$cookie.get("userUuid");
      const userName = this.$cookie.get("userName");

      this.$store.commit("setUser", {
        name,
        userType,
        userUuid,
        userName
      });
    }
  },
  computed: {
    appPageTools() {
      // console.log('$route.name:', this.$route.name)
      // console.log('appPageToolsMap[this.$route.name]::', this.appPageToolsMap[this.$route.name])
      return this.appPageToolsMap[this.$route.name] || {};
    },
    ...mapState({
      user: "user",
      appPageToolsMap: "appPageToolsMap"
    })
  },
  watch: {
    $route: {
      handler(currentRoute = {}, preRoute = {}) {
        // console.log('当前路由:', currentRoute)
        // console.log('旧路由：', preRoute)
        // 如果keepAliveName的长度等于0，并且当前currentRoute的isMainPage为true
        if (this.keepAliveName.length == 0 && currentRoute.meta.isMainPage) {
          this.keepAliveName.push(currentRoute);
        } else if (
          this.keepAliveName.length > 0 &&
          currentRoute.meta.isMainPage
        ) {
          this.keepAliveName.pop();
          this.keepAliveName.push(currentRoute);
        }
        // console.log('keepAliveName：', this.keepAliveName)
      },
      immediate: true
    }
  }
};
</script>



<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-touch-callout: none;
  -webkit-tap-highlight-color: transparent;
}

*:not(input, textarea) {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

a {
  color: $--color-primary;
}

input {
  border: 0;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

html,
body {
  height: 100%;
  width: 100%;
  min-width: 1200px;
  font-size: 26px;
  color: #333333;
  background-color: #e9ecf3;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// *************基础样式

.app {
  height: 100%;
}
.app-container {
  width: 100%;
}
.app-header {
  display: flex;
  z-index: 20;
  align-items: center;
  font-size: 12px;
  background-color: $--color-white;
  box-shadow: 1 2px 10px rgba(0, 0, 0, 0.05);
  .app-header__left {
    flex: 0 0 180px;
    text-align: center;
  }
  .app-header__center {
    flex: 1;
    overflow: auto;
  }
  .app-header__right {
    text-align: right;
  }
}

//页面部分
.app-page {
  position: relative;
  padding: 10px 5px 15px;
  border-radius: 6px;
  background-color: $--color-white;
  .app-page-header {
    padding: 0px 15px;
    margin-bottom: 10px;
    .app-page-header__row {
      display: flex;
      align-items: center;
      border-bottom: 1px solid $--color-primary;
      padding-bottom: 10px;
    }
  }
  .app-page-tools {
    position: relative;
    height: 28px;
    text-align: right;
  }
  &.app-login {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 1000;
    border-radius: 0;
    overflow: hidden;
    background: linear-gradient(to bottom right, #fe9, #369);
  }
  .app-view {
    position: relative;
    padding: 5px 15px 0;
  }
}

// 侧边栏
.app-aside {
  margin: 20px 0px 20px 20px;
  border-radius: 6px;
  background-color: $--color-white;
  overflow: hidden !important;
  transition: all 0.2s ease-in-out;
  .app-menu {
    min-width: 100%;
    border-right: 0 !important;
    .app-menu-icon {
      margin-right: 10px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
    }
  }
}
</style>
