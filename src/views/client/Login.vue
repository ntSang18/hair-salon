<template>
  <section id="login">
    <div class="login-container">
      <div class="img-container"></div>
      <form action="">
        <div :class="[showErrorLogin ? 'title error' : 'title']">
          <h3>WELCOME BACK</h3>
          <h5>SIGN IN</h5>
          <p>Incorrect phone number or password!</p>
        </div>
        <div :class="[showErrorPhone ? 'inp-group error' : 'inp-group']">
          <label for="phone">Phone number</label>
          <input type="text" id="phone" placeholder="Your Phone Number" v-model="phone" />
          <p>Invalid phone number!</p>
        </div>
        <div :class="[showErrorPassword ? 'inp-group error' : 'inp-group']">
          <label for="password">Password</label>
          <input type="password" id="password" placeholder="Your Password" v-model="password" />
          <p>Invalid password!</p>
        </div>
        <button @click.prevent="login()">LOGIN NOW</button>
        <div class="direct">
          <a href="#">Forgot password?</a>
          <router-link class="btn-login" to="/salon/register">Register here.</router-link>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import CustomerService from '@/services/CustomerService';
import { mapActions } from 'vuex';
export default {
  name: 'Login',
  data() {
    return {
      phone: '',
      password: '',
      showErrorLogin: false,
      showErrorPhone: false,
      showErrorPassword: false,
    };
  },
  methods: {
    ...mapActions(['deToken']),
    isValidPhoneNumber() {
      let r = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
      if (this.phone.match(r)) {
        return true;
      } else {
        return false;
      }
    },
    async login() {
      this.showErrorLogin = false;
      this.showErrorPhone = false;
      this.showErrorPassword = false;
      if (!this.isValidPhoneNumber()) this.showErrorPhone = true;
      else if (this.password === '') this.showErrorPassword = true;
      else {
        const obj = {
          phone: this.phone,
          password: this.password,
        };
        const res = await CustomerService.login(obj);
        if (res.status == '200') {
          await this.deToken(res.data);
          // this.$router.push('/salon');
          this.$router.back();
        } else {
          this.showErrorLogin = true;
        }
      }
    },
  },
};
</script>
