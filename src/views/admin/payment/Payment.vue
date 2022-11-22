<template>
  <div class="container">
    <Title title="Payment" />
    <div class="content-bill">
      <el-dialog v-model="dialogBill" width="25%">
        <div v-if="billDone">
          <BillDone :booking="billDone" />
        </div>
      </el-dialog>

      <div>
        <div class="label d-inline-block">Customer:</div>
        <el-input class="input" v-model="customerPhone" placeholder="Phone ..." />
        <button class="btn-search" @click="searchPhone">Search</button>

        <div v-if="showCustomer == 'customer'" style="margin: 10px 0px 10px 120px">
          <div><span style="display: inline-block; width: 100px">Name:</span>{{ customer.name }}</div>
          <div><span style="display: inline-block; width: 100px">Type:</span> {{ customer.customerType.name }}</div>
          <div>
            <span style="display: inline-block; width: 100px">Discount:</span>{{ customer.customerType.percent }}
          </div>
        </div>
        <div v-if="showCustomer == 'noCustomer'" style="margin: 10px 0px 10px 120px">
          <div>No customer!</div>
        </div>
        <div v-if="errorPhone">This field is require!</div>
        <div v-if="bill.customer">{{ bill.customer.name }}</div>
        <div class="label d-inline-block">Barber:</div>
        <el-select v-model="barber" class="m-2" placeholder="Select" filterable>
          <el-option v-for="item in barbers" :key="item.Id" :label="item.name" :value="item.Id" />
        </el-select>
        <div>
          <div class="label d-inline-block">Voucher:</div>
          <el-input class="input" v-model="bill.voucherCode" placeholder="Voucher ..." />
          <button class="btn-search" @click="checkVoucherCode">Check</button>
        </div>
        <div v-if="showVoucher == 'voucher'" class="coupon-message success">
          {{ couponMessage() }}
        </div>
        <!-- <div v-if="showVoucher == 'noVoucher'" style="margin: 10px 0px 10px 120px"> -->
        <div v-if="showVoucher == 'noVoucher'" class="coupon-message error">
          {{ couponMessage() }}
        </div>
        <!-- </div> -->
        <div class="label">Service:</div>
        <el-tree
          ref="treeRef"
          :data="services"
          show-checkbox
          check-strictly
          default-expand-all
          node-key="id"
          highlight-current
          :props="servicesProps"
          class="tree"
        />

        <div><button class="btn-search" @click="clickPayment">Payment</button></div>
      </div>
    </div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import BillDone from '@/components/admin/BillDone';
import ServiceService from '@/services/ServiceService';
import CustomerService from '@/services/CustomerService';
import StaffService from '@/services/StaffService';
import BillService from '@/services/BillService';
import AdvertisementService from '@/services/AdvertisementService';

export default {
  components: { Title, BillDone },
  data() {
    return {
      services: [],
      customers: [],
      customer: null,
      customerPhone: '',
      voucher: null,
      barbers: [],
      barber: null,
      servicesProps: {
        children: 'services',
        label: 'name',
      },
      bill: {
        serviceArray: [],
        phone: '',
        price: 0,
        staffId: null,
        voucherCode: '',
      },
      showCustomer: '',
      showVoucher: '',
      billDone: null,
      dialogBill: false,
    };
  },
  mounted() {
    this.getServiceTypes();
    this.getCustomers();
    this.getBarbers();
  },
  watch: {
    customerPhone() {
      this.customers = this.customers.filter(el => el.phone.includes(this.customerPhone));
    },
  },
  methods: {
    clickPayment() {
      this.bill.serviceArray = this.$refs.treeRef.getCheckedNodes();
      this.bill.phone = this.customerPhone;
      this.bill.price = this.bill.serviceArray.reduce((a, b) => a + b.price, 0);
      if (this.customer) this.bill.price = this.bill.price * (1 - this.customer.customerType.percent / 100);
      if (this.voucher) {
        if (this.voucher.discount) this.bill.price = this.bill.price * (1 - this.voucher.discount / 100);
      }
      this.bill.staffId = this.barber;

      this.errorPhone = this.bill.phone == '' ? true : false;

      this.createBill();
    },
    reset() {
      this.customer = null;
      this.customerPhone = '';
      this.bill = {
        serviceArray: [],
        phone: '',
        price: 0,
        staffId: null,
      };
    },
    async getServiceTypes() {
      const response = await ServiceService.getServiceTypes();
      if (response && response.data) {
        this.services = response.data;
      }
    },
    async getCustomers() {
      const response = await CustomerService.getCustomers();
      if (response && response.data) {
        this.customers = response.data.customers;
      }
    },
    async getBarbers() {
      const response = await StaffService.getBarbers();
      if (response && response.data) {
        this.barbers = response.data.staffs;
      }
    },
    async searchPhone() {
      const response = await CustomerService.searchCustomers(null, null, this.customerPhone);
      if (response && response.data) {
        if (response.data.customers.length == 1) {
          this.customer = response.data.customers[0];
          this.showCustomer = 'customer';
        } else this.showCustomer = 'noCustomer';
      }
    },
    async createBill() {
      let serviceArray = [];
      this.bill.serviceArray.forEach(el => {
        serviceArray.push(el.Id);
      });
      this.bill.serviceArray = serviceArray;
      const response = await BillService.createBill(this.bill);
      if (response && response.data) {
        this.$store.state.toast.success('Payment success!');
        // watch bill
        this.billDone = response.data;
        this.dialogBill = !this.dialogBill;
      } else this.$store.state.toast.error('Payment failed!');
    },
    async checkVoucherCode() {
      this.voucher = null;
      const response = await AdvertisementService.checkVoucherCode(this.bill.voucherCode);
      if (response && response.data) {
        this.voucher = response.data;
        this.showVoucher = 'voucher';
      } else this.showVoucher = 'noVoucher';
    },
    couponMessage() {
      if (this.voucher) {
        return `Valid coupon. Percent discount: ${this.voucher.discount}%`;
      }
      return 'Invalid coupon';
    },
  },
};
</script>

<style scoped>
.input {
  width: 280px;
  height: 36px;
  margin-right: 30px;
  margin-left: 7px;
}
.label {
  font-size: 18px;
  height: 36px;
  line-height: 36px;
  text-transform: uppercase;
  width: 120px;
}
.tree {
  width: 600px;
  background-color: transparent;
  font-size: 20px;
}
.btn-search {
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #6741d9;
  background-color: #fff;
  float: right;
  color: #6741d9;
}
.content-bill {
  background-color: #fff;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin: 0px auto;
  padding: 20px 40px;
  border: 1px solid #e9ecef;
  border-radius: 10px;
}

.coupon-message {
  font-size: 12px;
  font-weight: 500;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 5px;
  margin-top: 5px;
}
.coupon-message.success {
  background-color: #fabd05;
}
.coupon-message.error {
  background-color: #909399;
}
</style>
