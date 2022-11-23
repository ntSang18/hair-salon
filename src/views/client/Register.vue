<template>
  <section id="register">
    <div class="register-container">
      <div class="img-container"></div>
      <form action="">
        <div :class="showErrorRegister ? 'title error' : 'title'">
          <h5>SIGN UP</h5>
          <p>Phone number already exist!</p>
        </div>
        <div class="row-6">
          <div :class="showErrorPhone ? 'inp-group error' : 'inp-group'">
            <label for="phone">Phone Number</label>
            <input type="text" id="phone" placeholder="Your Phone Number" v-model="phone" />
            <p>Invalid phone number!</p>
          </div>
          <div :class="showErrorName ? 'inp-group error' : 'inp-group'">
            <label for="name">Full Name</label>
            <input type="text" id="name" placeholder="Your Full Name" v-model="name" />
            <p>Full name can't be empty!</p>
          </div>
        </div>
        <div class="row-6">
          <div :class="showErrorPassword ? 'inp-group error' : 'inp-group'">
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Your Password" v-model="password" />
            <p>Password can't be empty!</p>
          </div>
          <div :class="showErrorRepassword ? 'inp-group error' : 'inp-group'">
            <label for="repass">Repeat Password</label>
            <input type="password" id="repass" placeholder="Repeat Your Password" v-model="repassword" />
            <p>Invalid repeat password!</p>
          </div>
        </div>
        <div class="row-12">
          <div :class="showErrorAddress ? 'inp-group error' : 'inp-group'">
            <label for="repass">Address</label>
            <input type="text" id="address" placeholder="Your Address" v-model="address" />
            <p>Address can't be empty!</p>
          </div>
        </div>
        <button @click.prevent="register()">REGISTER NOW</button>
        <div class="direct">
          <router-link class="btn-login" to="/salon/login">Login here.</router-link>
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
      name: '',
      password: '',
      repassword: '',
      address: '',
      showErrorPhone: false,
      showErrorName: false,
      showErrorPassword: false,
      showErrorRepassword: false,
      showErrorAddress: false,
      showErrorRegister: false,
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
    async register() {
      this.showErrorPhone = false;
      this.showErrorName = false;
      this.showErrorPassword = false;
      this.showErrorRepassword = false;
      this.showErrorAddress = false;
      this.showErrorRegister = false;
      if (!this.isValidPhoneNumber()) this.showErrorPhone = true;
      else if (this.name === '') this.showErrorName = true;
      else if (this.password === '') this.showErrorPassword = true;
      else if (this.repassword !== this.password) this.showErrorRepassword = true;
      else if (this.address === '') this.showErrorAddress = true;
      else {
        const obj = {
          phone: this.phone,
          name: this.name,
          password: this.password,
          address: this.address,
        };
        const res = await CustomerService.register(obj);
        if (res.status == '200') {
          await this.deToken(res.data);
          this.$router.hack();
        } else {
          this.showErrorRegister = true;
        }
      }
    },
  },
};
</script>
