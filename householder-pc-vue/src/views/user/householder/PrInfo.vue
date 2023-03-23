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
            <span>{{ householderForm.name }}</span>
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
            <span>{{ householderForm.title }}</span>
          </el-form-item>
        </el-col>
        <el-col :span="11" :offset="2">
          <h5>修改密码</h5>
          <el-form-item label="账号">
            <span>{{ householderForm.userName }}</span>
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
        <el-button @click="resetForm('householderForm')">重置</el-button>
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
        password: "",
        checkPassword: ""
      },
      rules: {
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        checkPassword: [
          { required: true, validator: validatePass2, trigger: "blur" }
        ]
      },
      resetPassword: false
    };
  },
  activated() {
    this.refreshPage();
  },
  methods: {
    refreshPage() {
      this.get();
    },
    async get() {
      const householderUuid = this.$route.params;
        console.log(householderUuid)
      const householder = await this.$api.householder.get(householderUuid);

      // 获取到后台返回来的数据: householder
      Object.assign(this.householderForm, householder);
      //   console.log(this.householderForm)
    },
    submitForm(formName) {
      this.$confirm("保存信息后需要重新登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          await this.$api.householder.saveModify({
            householder: this.householderForm
          });

          this.$message({
            type: "success",
            message: "修改成功!"
          });
          this.$router.push({ name: "login" });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消修改"
          });
        });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
    
  <style>
</style>