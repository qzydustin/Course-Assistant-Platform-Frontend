<template>
  <div class="signup">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>账号注册</span>
      </div>
      <el-form ref="form" :model="user">
        <el-form-item>
          <el-input v-model="user.username" placeholder="用户名"></el-input>
        </el-form-item>

        <el-form-item>
          <el-input type="password" v-model="user.password" placeholder="密码"></el-input>
        </el-form-item>

        <div class="center">
          <el-button type="primary" @click="signUpAsTeacher">我是老师</el-button>
          <el-button type="primary" @click="signUpAsStudent">我是学生</el-button>
        </div>

      </el-form>

      <div class="center">
        <el-button type="text" @click="jumpToLogin">已有账号？去登录</el-button>
      </div>
    </el-card>
  </div>
</template>


<script>
import sha1 from "sha1";

export default {
  data() {
    return {
      user: {
        username: null,
        password: null,
        auth: null
      }
    }
  },
  methods: {
    jumpToLogin() {
      this.$router.push('/login');
    },
    signUpAsTeacher() {
      this.user.auth = 0;
      this.signUp();
    },
    signUpAsStudent() {
      this.user.auth = 1;
      this.signUp();
    },
    signUp() {
      let salt = this.user.username
      let pwd = sha1(this.user.password + salt)
      this.axios.post("api/signup", {username: this.user.username, password: pwd, auth: this.user.auth})
          .then(res => {
            if (res.data !== 200) {
              this.$message.error("注册失败");
            } else {
              this.$message.success("注册成功");
              this.jumpToLogin();
            }
          });
    }


  }
}
</script>
<style scoped>

.signup {
  display: flex;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: url(~@/assets/signup_bg.jpg) no-repeat;
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