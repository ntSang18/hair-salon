<template>
  <div class="body">
    <div class="d-flex justify-content-center login">
      <div><img src="@/assets/login.jpeg" alt="" style="width: 450px" class="h-100" /></div>
      <div style="width: 450px" class="px-5 h-100">
        <p class="h-25 login-text">Login</p>
        <div>
          <h5>Username</h5>
          <el-input v-model="phone" type="text" placeholder="Your Username ..." class="input" clearable> </el-input>
        </div>
        <div class="error-login" v-if="showErrorPhone">The email or password is not a valid</div>
        <div>
          <h5>Password</h5>
          <el-input v-model="password" type="password" placeholder="Your Password ..." class="input" clearable>
          </el-input>
        </div>
        <div class="error-login" v-if="showErrorPassword">The email or password is not a valid</div>
        <div class="error-login" v-if="showErrorLogin">The email or password is not a valid</div>
        <el-button class="button btn-green" @click="login"> Log in </el-button>
        <el-button class="button btn-google"> Log in with Google </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import StaffService from '@/services/StaffService';
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      showErrorLogin: false,
      showErrorPhone: false,
      showErrorPassword: false,
      phone: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['deToken']),
    async login() {
      this.showErrorPhone = false;
      this.showErrorPassword = false;
      this.showErrorLogin = false;
      if (this.phone == '') this.showErrorPhone = true;
      else if (this.password == '') this.showErrorPassword = true;
      else {
        const obj = {
          phone: this.phone,
          password: this.password,
        };
        const response = await StaffService.login(obj);
        if (response.status == '200') {
          await this.deToken(response.data);
          this.$router.push('/accounts');
        } else {
          this.showErrorLogin = true;
        }
      }
    },
  },
};
</script>

<style scoped>
.body {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f8f9fa;
}
.login {
  background-color: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 10px 10px 10px 0px #dee2e6;
}
.login-text {
  font-size: 30px;
  font-weight: 600;
  height: 200px;
  line-height: 200px;
}
h5 {
  font-size: 14px;
  text-align: start;
}
.input {
  margin-bottom: 20px;
  height: 50px;
  border-radius: 10px !important;
}
.button {
  width: 100%;
  height: 50px;
  margin-bottom: 20px;
  border-radius: 5px;
  margin-bottom: 30px;
}
.button + .button {
  margin-left: 0;
}
.btn-green {
  background-color: #0ca678;
  color: #fff;
}
.btn-green:hover {
  background-color: #099268;
  cursor: pointer;
  color: #fff;
}
.btn-google:hover {
  background-color: #fa5252;
  color: #fff;
}
.text {
  font-size: 14px;
  color: #12b886;
  text-align: start;
}
.error-login {
  color: red;
  width: 100%;
  text-align: center;
  margin-top: -8px;
}
</style>
