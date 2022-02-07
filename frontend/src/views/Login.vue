<template>
  <div class="login">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号登陆</span>
      </div>
      <el-form ref="user" :model="user">
        <el-form-item>
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>
        <el-form-item class="center">
          <el-button type="primary" @click="login">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="center">
        <el-button type="text" @click="jumpToSignup">还没有账号？去注册</el-button>
      </div>
    </el-card>
  </div>
</template>


<script>
import Home from "@/views/Home";
import sha1 from "sha1";

export default {
  data() {
    return {
      user: {
        username: null,
        password: null
      }
    }
  },

  methods: {
    jumpToSignup() {
      this.$router.push('/signup');
    },
    login() {
      let salt = this.user.username
      let pwd = sha1(this.user.password + salt)
      this.axios.post("api/login", {username: this.user.username, password: pwd})
          .then(res => {
            if (res.data.state !== 200) {
              this.$message.error("登录失败");
            } else {
              localStorage.setItem("Flag", "isLogin");
              localStorage.setItem("ID", res.data.id);
              localStorage.setItem("Username", res.data.username);
              localStorage.setItem("Auth", res.data.auth);
              this.$message.success("登录成功");
              this.$router.push(Home);
            }
          });
    }
  }
}
</script>
<style scoped>

.login {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url(~@/assets/login_bg.jpg) no-repeat;
  background-size: 100% 100%;
}

.center {
  display: flex;
  justify-content: center;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.box-card {
  margin: auto;
  width: 400px;
}

</style>