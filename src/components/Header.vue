<template>
  <div class="header">
    <div class="navbar">
      <div class="left">
        <img src="./img/logo.png" alt="logo" />
        <span>“最好的前端交流社区！”</span>
      </div>
      <div class="right">
        <div  class="notlogin" v-if="!this.user">
          <a @click="loginDialog = true">登录</a> |
          <a @click="regisDialog = true">注册</a>
        </div>
        <div class="navbar-user" v-else>
            <span>{{ this.user.nickname }}</span>
            <el-badge :value="message" class="item">
              <el-button size="medium">消息通知</el-button>
            </el-badge>
            <span class="ml-5" style="cursor: pointer;" @click="logout">退出</span>
          </div>
     
      </div>
 
    </div>
    <!-- -----登录表单--------- -->
    <el-drawer
        title="欢迎登录灵犀互动社区"
        :visible.sync="loginDialog"
        direction="rtl"
      >
      <el-form :model="loginForm" status-icon :rules="loginRules" ref="loginForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="loginForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item style="margin-left: 100px;">
    <el-button type="primary" @click="goLogin">登录</el-button>
    <el-button @click="resetForm('loginForm')">重置</el-button>
  </el-form-item>
</el-form>

      </el-drawer>
<!-------------------------注册表单----------- -->
      <el-drawer
        title="灵犀互动社区注册中心"
        :visible.sync="regisDialog"
        direction="rtl"
      >
      <el-form :model="regisForm" status-icon :rules="regisRules" ref="regisForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="用户名" prop="username">
    <el-input v-model="regisForm.username"></el-input>
  </el-form-item>
  <el-form-item label="昵称" prop="nickname">
    <el-input v-model="regisForm.nickname"></el-input>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input type="password" v-model="regisForm.password" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item label="确认密码" prop="checkPass">
    <el-input type="password" v-model="regisForm.checkPass" autocomplete="off"></el-input>
  </el-form-item>
  <el-form-item style="margin-left: 100px;">
    <el-button type="primary" @click="goRegis">注册</el-button>
    <el-button @click="resetForm('regisForm')">重置</el-button>
  </el-form-item>
</el-form>
      </el-drawer>
  </div>
</template>

<script>
import { login } from '@/mock/api'; 
import axios from 'axios'
export default {
  data() {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      message: 5,
      loginDialog: false,
      regisDialog: false,
      loginForm: {
        username: "",
        password:""
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {min:3,max:10,message:"长度是3到10个字符",trigger: "blur"}
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
         {min:3,max:20,message:"长度是3到20个字符",trigger: "blur"}]
      },
      regisForm: {
        username: "",
        password: "",
        checkPass: "",
        nickname:""
      },
      regisRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {min:3,max:10,message:"长度是3到10个字符",trigger: "blur"}
        ],
        username: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          {min:3,max:10,message:"长度是3到10个字符",trigger: "blur"}
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" },
         {min:3,max:20,message:"长度是3到20个字符",trigger: "blur"}],
          checkPass:[{ required: true, message: "再次输入密码", trigger: "blur" },
         {min:3,max:20,message:"长度是3到20个字符",trigger: "blur"}]
      }
    }
  },
  methods: {
    goLogin() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          login(this.loginForm.username, this.loginForm.password).then(res => {
            if (res.code == '200') {
              localStorage.setItem("user", JSON.stringify(res.data))
              this.$message.success(res.message);
              this.user = JSON.parse(localStorage.getItem("user"))
              this.loginDialog = false
            } else {
              this.$message.error(res.message);
          }
          })
          //如果是刚注册的
          const users = JSON.parse(localStorage.getItem("users"))
          let one =users.find(u => u.username === this.loginForm.username && u.password === this.loginForm.password )
          if (one) {
            localStorage.setItem("user", JSON.stringify(res.data))
              this.user = JSON.parse(localStorage.getItem("user"))
              this.loginDialog = false
          } else {
            this.$message.error("登录失败");
           }
        } else {
          this.$message.error("校验有误");
          }
       })
    },
    //注册
    goRegis() {
      this.$refs['regisForm'].validate((valid) => {
        if (valid) {  
          if (this.regisForm.password !== this.regisForm.checkPass) {
            this.$message.error("两次输入的密码不一致")
            return false
          }
          axios.post("/api/register", this.regisForm).then(res => {
            if(res.data.code == '200') {
              this.$message.success("注册成功");  
              localStorage.setItem("users", JSON.stringify(res.data.data))
              this.regisDialog = false
            } else {
              this.$message.error(res.data.message)
            }
          })
        }
      });
    },
      resetForm(formName) {
        this.$refs[formName].resetFields();
    },
  //退出登录
    logout() {
      // 处理退出登录的逻辑
      localStorage.removeItem("user");
      this.$message.success("退出登录成功");
      this.user = JSON.parse(localStorage.getItem("user"))
    },
  },
};
</script>

<style scoped lang="less">
.header {
  width: 100%;
  height: 80px;
  font-size: 20px;
  display: flex;
  justify-content: center;
  .navbar {
    width: 70%;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      img {
        width: 120px;
        height: 80px;
      }
    }
    .right {
      .notlogin {
        line-height: 80px;
      }
      .navbar-user {
        img {
          width: 60px;
          height: 60px;
          border-radius: 100%;
        }
        span {
          font-size: 15px;
          font-weight: 900;
          line-height: 80px;
          margin-right: 10px;
          .item {
            margin-left: 10px;
            margin-top: 10px;
            margin-right: 40px;
          }
        }
      }
    }
  }
}
</style>
