<template>
  <div class="login">
    <el-form :model="loginForm" :rules="rules" ref="loginForm" class="login-form" :hide-required-asterisk="true">
      <el-form-item label="账号：" label-width="60px" prop="userName">
        <el-input v-model.trim="loginForm.userName" placeholder="账号" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码：" label-width="60px" prop="password">
        <el-input v-model.trim="loginForm.password" placeholder="密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="用户：" label-width="60px">
        <el-radio-group v-model="loginForm.userType" @change="typeChange()">
          <el-radio label="administrator">管理员</el-radio>
          <el-radio label="householder">户主</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="submitForm('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
    
<script>
export default {
  name: "login",
  data() {
    return {
      loginForm: {
        userName: "",
        password: "",
        userType: "administrator"
      },
      rules: {
        userName: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const user = await this.$api.login(this.loginForm);
          // console.log(user.userType)
          if(user.userType=='administrator'){
            window.location.hash = "/householder/list"; //#login
            // reload()是将服务端数据重新载入
            window.location.reload();
          }else{
            this.$router.push({
               name: 'householderPrInfo',
               params: { 
                householderID: user.uuid,
              }
             })
          }
        }
        return valid;
      });
    },
    typeChange() {
      console.log(this.loginForm.userType);
    }
  }
};
</script>
    
<style lang="scss">
.login {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  .login-form {
    width: 380px;
    .login-btn {
      width: 100%;
      margin-left: 60px;
      width: 320px;
      border-color: $--color-primary;
      background-color: $--color-primary;
    }
  }
}
</style>