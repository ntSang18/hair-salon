<template>
  <section id="account">
    <div class="setting-sidebar">
      <ul>
        <li><router-link to="/salon/account">Account</router-link></li>
        <li><router-link to="/salon/change-password">Change password</router-link></li>
      </ul>
    </div>
    <div class="account-info">
      <h2>Change password</h2>
      <div class="row-12">
        <div :class="[showErrorCurrent ? 'inp-group error' : 'inp-group']">
          <label for="current">Current password</label>
          <input type="password" id="current" v-model="currentPassword" />
          <p>Invalid current password!</p>
        </div>
      </div>
      <div class="row-12">
        <div :class="[showErrorNew ? 'inp-group error' : 'inp-group']">
          <label for="new">New password</label>
          <input type="password" id="new" v-model="newPassword" />
          <p>New password can't be empty!</p>
        </div>
      </div>
      <div class="row-12">
        <div :class="[showErrorRepeat ? 'inp-group error' : 'inp-group']">
          <label for="repeat">Repeat password</label>
          <input type="password" id="repeat" v-model="repeatPassword" />
          <p>Invalid repeat password!</p>
        </div>
      </div>
      <div class="footer">
        <button @click="changePassword()">Save changes</button>
      </div>
    </div>
  </section>
</template>

<script>
import CustomerService from '@/services/CustomerService';
import { mapState } from 'vuex';
export default {
  name: 'Change Password',
  data() {
    return {
      currentPassword: '',
      newPassword: '',
      repeatPassword: '',
      showErrorCurrent: false,
      showErrorNew: false,
      showErrorRepeat: false,
    };
  },
  computed: {
    ...mapState(['customer']),
  },
  methods: {
    async changePassword() {
      this.showErrorCurrent = false;
      this.showErrorRepeat = false;
      this.showErrorNew = false;
      if (!this.currentPassword) this.showErrorCurrent = true;
      else if (!this.newPassword) this.showErrorNew = true;
      else if (this.repeatPassword !== this.newPassword) this.showErrorRepeat = true;
      else {
        const obj = {
          Id: this.customer.Id,
          newPassword: this.newPassword,
          oldPassword: this.currentPassword,
        };
        const res = await CustomerService.changePassword(obj);
        if (res.status == '200') {
          this.$store.state.toast.success('Change password successful!');
          this.currentPassword = '';
          this.repeatPassword = '';
          this.newPassword = '';
        } else {
          this.$store.state.toast.error('Change password failed!');
        }
      }
    },
  },
};
</script>
