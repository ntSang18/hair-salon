<template>
  <section id="account">
    <div class="setting-sidebar">
      <ul>
        <li><router-link to="/salon/account">Account</router-link></li>
        <li><router-link to="/salon/change-password">Change password</router-link></li>
      </ul>
    </div>
    <div class="account-content">
      <div class="account-info">
        <div class="header">
          <h2>Account</h2>
        </div>
        <div class="img-container">
          <!-- <img v-if="previewImage" :src="previewImage" @click="selectImage()" /> -->
          <img v-if="accountInfo.imagePath" :src="imagePath" @click="selectImage()" />
          <img v-else src="@/assets/client/images/experts/p1.png" @click="selectImage()" />
          <input ref="fileInput" type="file" id="avatar" @change="pickImage()" />
          <button @click="selectImage()">Upload</button>
        </div>
        <div class="row-6">
          <div :class="[showErrorPhone ? 'inp-group error' : 'inp-group']">
            <label for="phone">Phone Number</label>
            <input type="text" id="phone" v-model="accountInfo.phone" />
            <p>Invalid phone number!</p>
          </div>
          <div :class="[showErrorName ? 'inp-group error' : 'inp-group']">
            <label for="name">Full Name</label>
            <input type="text" id="name" v-model="accountInfo.name" />
            <p>Name can't be empty!</p>
          </div>
        </div>
        <div class="row-12">
          <div :class="[showErrorAddress ? 'inp-group error' : 'inp-group']">
            <label for="address">Address</label>
            <input type="text" id="address" v-model="accountInfo.address" />
            <p>Address can't be empty!</p>
          </div>
        </div>
        <div class="footer">
          <button @click="updateAccount()">Save changes</button>
        </div>
      </div>
      <div class="rank-info">
        <h2>Rank</h2>
        <div class="details">
          <span :class="accountRank"
            >Current rank: <strong>{{ accountRank }}</strong></span
          >
          <span
            >Current point: <strong>{{ accountInfo.point }}</strong></span
          >
          <span
            >Percent discount: <strong>{{ discountPercent }}</strong></span
          >
          <div class="more-info">
            <span>You can schedule to earn more points and discount bills.</span>
            <table>
              <tr>
                <td>&emsp;&#8226;Default</td>
                <td>0%</td>
              </tr>
              <tr>
                <td>&emsp;&#8226;Bronze</td>
                <td>5%</td>
              </tr>
              <tr>
                <td>&emsp;&#8226;Silver</td>
                <td>10%</td>
              </tr>
              <tr>
                <td>&emsp;&#8226;Gold</td>
                <td>15%</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CustomerService from '@/services/CustomerService';
import { mapActions, mapState } from 'vuex';
export default {
  name: 'Account',
  data() {
    return {
      accountInfo: {
        imagePath: '',
        phone: '',
        name: '',
        address: '',
        customerTypeId: 0,
        point: null,
      },
      imagePicked: null,
      showErrorPhone: false,
      showErrorName: false,
      showErrorAddress: false,
    };
  },
  mounted() {
    this.getAccountInfo();
  },
  computed: {
    ...mapState(['customer']),
    accountRank() {
      if (this.accountInfo.customerTypeId == 1) return 'Gold';
      else if (this.accountInfo.customerTypeId == 2) return 'Silver';
      else if (this.accountInfo.customerType == 3) return 'Bronze';
      else return 'Default';
    },
    discountPercent() {
      if (this.accountInfo.customerTypeId == 1) return '15%';
      else if (this.accountInfo.customerTypeId == 2) return '10%';
      else if (this.accountInfo.customerType == 3) return '5%';
      else return '0%';
    },
    imagePath() {
      if (this.imagePicked) {
        return this.accountInfo.imagePath;
      } else {
        return 'http://' + this.accountInfo.imagePath;
      }
    },
  },
  methods: {
    ...mapActions(['updateCustomer']),
    getAccountInfo() {
      this.accountInfo.imagePath = this.customer.imagePath;
      this.accountInfo.phone = this.customer.phone;
      this.accountInfo.name = this.customer.name;
      this.accountInfo.address = this.customer.address;
      this.accountInfo.customerTypeId = this.customer.customerTypeId;
      if (this.customer.point) {
        this.accountInfo.point = this.customer.point;
      } else {
        this.accountInfo.point = 0;
      }
    },
    selectImage() {
      this.$refs.fileInput.click();
    },
    pickImage() {
      let input = this.$refs.fileInput;
      let file = input.files;
      if (file && file[0]) {
        this.imagePicked = file[0];
        this.accountInfo.imagePath = URL.createObjectURL(this.imagePicked);
      }
    },
    async updateAccount() {
      this.showErrorPhone = false;
      this.showErrorName = false;
      this.showErrorAddress = false;
      if (!this.accountInfo.phone.trim()) this.showErrorPhone = true;
      else if (!this.accountInfo.name.trim()) this.showErrorName = true;
      else if (!this.accountInfo.address.trim()) this.showErrorAddress = true;
      else {
        const obj = new FormData();
        obj.append('phone', this.accountInfo.phone);
        obj.append('name', this.accountInfo.name);
        obj.append('address', this.accountInfo.address);
        if (this.imagePicked) {
          obj.append('images', this.imagePicked);
        }
        const res = await CustomerService.updateCustomer(this.customer.Id, obj);
        if (res.status == '200') {
          this.$store.state.toast.success('Update successful!');
          this.updateCustomer(res.data);
          this.getAccountInfo();
          this.imagePicked = null;
        } else {
          this.$store.state.toast.error('Update failed!');
          this.getAccountInfo();
          this.imagePicked = null;
        }
      }
    },
  },
};
</script>
