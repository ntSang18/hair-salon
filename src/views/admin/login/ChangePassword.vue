<template>
  <div class="container padding-left-right">
    <Title title="Password" />
    <div class="d-flex justify-content-center flex-column" style="padding: 30px 300px">
      <div class="d-flex">
        <div class="title">Password:</div>
        <el-input v-model="password" class="input" clearable type="password"></el-input>
      </div>
      <div v-if="errorOldPass" class="error-mess">Password is not empty!</div>
      <div class="d-flex">
        <div class="title">New password:</div>
        <el-input v-model="newPassword" class="input" clearable type="password"></el-input>
      </div>
      <div class="d-flex">
        <div class="title">Enter password again:</div>
        <el-input v-model="reEnterPassword" class="input" @blur="blurPassword" clearable type="password"></el-input>
      </div>
      <div v-if="errorPass" class="error-mess">Password does not match!</div>
    </div>
    <div class="d-flex justify-content-center">
      <el-button type="success" @click="updatePassWord">Update</el-button>
      <el-button type="danger" @click="reset">Reset</el-button>
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import StaffService from '@/services/StaffService';
export default {
  components: {
    Title,
  },
  data() {
    return {
      password: '',
      newPassword: '',
      reEnterPassword: '',
      btnUpdate: false,
      errorPass: false,
      errorOldPass: false,
      idAccount: '',
    };
  },
  mounted() {
    this.idAccount = this.$route.params.id;
  },
  methods: {
    reset() {
      this.password = '';
      this.newPassword = '';
      this.reEnterPassword = '';
    },
    blurPassword() {
      if (this.newPassword == this.reEnterPassword) this.errorPass = false;
      else this.errorPass = true;
    },
    async updatePassWord() {
      if (this.password == '') this.errorOldPass = true;
      else {
        if (this.newPassword != this.reEnterPassword) this.errorPass = false;
        else {
          this.errorOldPass = false;
          const obj = {
            Id: this.idAccount,
            oldPassword: this.password,
            newPassword: this.newPassword,
          };
          const res = await StaffService.changePassword(obj);
          if (res && res.status == '200') {
            this.$store.state.toast.success('Update password successfully!');
          } else {
            this.$store.state.toast.error(res.err.response.data);
          }
          this.reset();
        }
      }
    },
  },
};
</script>

<style scoped>
.title {
  width: 40%;
  margin-bottom: 20px;
}
.input {
  height: 30px;
}
.error-mess {
  color: red;
  font-size: 18px;
}
</style>
