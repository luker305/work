<template>
  <div>
    <el-form
      :model="householderForm"
      :rules="rules"
      ref="householderForm"
      label-width="7em"
      size="mini"
    >
      <el-row>
        <el-col :span="11">
          <h5>住户基本信息</h5>
          <br />
          <el-form-item label="住户姓名" prop="name">
            <el-input v-model="householderForm.name" clearable></el-input>
          </el-form-item>
          <el-form-item label="联系电话" prop="tel">
            <el-input v-model="householderForm.tel" clearable></el-input>
          </el-form-item>
          <el-form-item label="QQ" prop="QQ">
            <el-input v-model="householderForm.QQ" clearable></el-input>
          </el-form-item>
          <el-form-item label="微信" prop="weChat">
            <el-input v-model="householderForm.weChat" clearable></el-input>
          </el-form-item>
          <el-form-item label="住户" prop="title">
            <el-input v-model="householderForm.title" clearable></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <h5>住户登录信息</h5>
          <el-form-item label="账号">
            <span>{{ householderForm.userName }}</span>
          </el-form-item>
          <el-form-item label="状态">
            <el-switch
              class="cursor-pointer"
              v-model="householderForm.enableStatus"
              active-value="1"
              inactive-value="0"
            ></el-switch>
            <span
              :class="householderForm.enableStatus | formatEnableStatusToClass"
            >{{ householderForm.enableStatus | formatEnableStatusToCN }}</span>
          </el-form-item>
          <el-form-item label="重置密码">
            <el-switch v-model="resetPassword"></el-switch>
          </el-form-item>
          <template v-if="resetPassword">
            <el-form-item label="新密码" prop="password">
              <el-input type="password" v-model.trim="householderForm.password" clearable></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="checkPassword">
              <el-input type="password" v-model.trim="householderForm.checkPassword" clearable></el-input>
            </el-form-item>
          </template>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm('householderForm')">保存</el-button>
        <el-button  @click="resetForm('householderForm')">重置</el-button>
        <el-button  @click="$router.push({ name: 'householderList' })">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
  
<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.householderForm.checkPassword !== "") {
          this.$refs.householderForm.validateField("checkPassword");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.householderForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      householderForm: {
        name: "",
        tel: "",
        QQ: "",
        weChat: "",
        title: "",
        userName: "",
        enableStatus: "",
        password: "",
        checkPassword: ""
      },
      rules: {
        name: [{ required: true, message: "请输入住户姓名", trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
      resetPassword: false,
    };
  },
  activated() {
    this.refreshPage()
  },
  methods: {
    refreshPage() {
      this.get()
    },
    async get() {
      const householderUuid = this.$route.params
    //   console.log(householderUuid)
      const householder = await this.$api.householder.get(householderUuid)

      // 获取到后台返回来的数据: householder
      Object.assign(this.householderForm, householder)
    //   console.log(this.householderForm)
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        // console.log('测试111111')
        if (valid) {
          // alert("submit!");
          // console.log('测试111111')
          await this.$api.householder.saveModify({ householder: this.householderForm })
          // 跳转到list页面
          this.$router.push({ name: 'householderList' })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  }
};
</script>
  
<style>
</style>