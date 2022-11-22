<template>
  <div style="padding: 0px 20px">
    <div class="d-flex justify-content-between">
      <div>
        <h1>HAIR-SALON</h1>
        <h3>123 Ton Duc Thang, Da Nang</h3>
        <h3>0905.090.090</h3>
        <h3>Hair-salon@gmail.com</h3>
      </div>
      <div>
        <h1>BILL</h1>
        <h3>Date: {{ bill.createDate }}</h3>
        <h3>Time: {{ bill.createTime }}</h3>
      </div>
    </div>
    <div class="customer-bill">
      <h2>Customer</h2>
      <h3 v-if="bill.customerId">Id: {{ bill.customerId }}</h3>
      <h3 v-if="bill.customerName">{{ bill.customerName }}</h3>
      <h3 v-if="bill.customerPhone">{{ bill.customerPhone }}</h3>
    </div>
    <div>
      <el-table ref="multipleTableRef" :data="bill.details" border @selection-change="handleSelectionChange">
        <el-table-column label="Service">
          <template #default="scope">
            <div>
              {{ scope.row.service.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Price" width="120">
          <template #default="scope">
            <div>
              {{ convertCurrency(scope.row.service.price) }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="total-bill">
      <div class="d-flex flex-column">
        <label>Sub total:</label>
        <label>Rank:</label>
        <label>Voucher:</label>
        <label>Discount:</label>
        <label>Total:</label>
      </div>
      <div>
        <h4>{{ convertCurrency(bill.subTotal) }}</h4>
        <h4>{{ booking.customer.customerType.percent }}%</h4>
        <h4>{{ bill.advertisementDiscount }}%</h4>
        <h4>-{{ convertCurrency(bill.discount) }}</h4>
        <h4 style="margin-top: 5px; padding-top: 5px; border-top: 2px solid #5646ab">
          {{ convertCurrency(bill.total) }}
        </h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['booking'],
  data() {
    return {
      bill: {
        createDate: null,
        createTime: null,
        subTotal: 0,
        discount: 0,
        total: 0,
        customerId: null,
        customerName: null,
        customerPhone: null,
        details: [],
        advertisementDiscount: 0,
      },
    };
  },
  mounted() {
    this.initBill();
  },
  watch: {
    booking() {
      this.initBill();
    },
  },
  methods: {
    reset() {
      this.bill = {
        createDate: null,
        createTime: null,
        subTotal: 0,
        discount: 0,
        total: 0,
        customerId: null,
        customerName: null,
        customerPhone: null,
        details: [],
        advertisementDiscount: 0,
      };
    },
    initBill() {
      this.reset();
      this.bill.customerId = this.booking.customer.Id;
      this.bill.customerName = this.booking.customer.name;
      this.bill.customerPhone = this.booking.customer.phone;
      this.bill.details = this.booking.booking ? this.booking.booking.details : this.booking.details;
      this.bill.createDate = this.booking.createdAt.slice(0, 10);
      this.bill.createTime = this.booking.createdAt.slice(11, 19);

      let sum = 0;
      this.bill.details.forEach(function (el) {
        sum += el.service.price;
      });
      this.bill.subTotal = sum;
      this.bill.total = this.booking.price;
      this.bill.discount = this.bill.subTotal - this.booking.price;

      let discountCustomerType = (this.bill.subTotal * this.booking.customer.customerType.percent) / 100;
      console.log(discountCustomerType);
      let discountCVoucher = ((this.bill.subTotal - discountCustomerType - this.bill.total) / this.bill.subTotal) * 100;
      // case 0: default = 0
      // case 1: no booking in bill
      if (!this.booking.booking) this.bill.advertisementDiscount = discountCVoucher;
      // case 2: have booking
      if (this.booking.booking && this.booking.booking.advertisement)
        this.bill.advertisementDiscount = this.booking.booking.advertisement.discount;
    },
    convertCurrency(vnd) {
      return vnd.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 26px;
  color: #5646ab;
}
h2 {
  font-size: 22px;
}
h3 {
  color: #495057;
  font-size: 14px;
}
.customer-bill {
  margin: 20px 0px;
  color: #5646ab;
}
.total-bill {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.total-bill label {
  font-size: 14px;
  height: 18px;
  margin-right: 10px;
  margin-bottom: 10px;
  line-height: 18px;
}
.total-bill h4 {
  font-size: 14px;
  height: 18px;
  line-height: 18px;
  margin-bottom: 10px;
  width: 100px;
  text-align: end;
}
.btn-payment {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
.btn-payment button {
  padding: 5px 10px;
  background-color: #5646ab;
  color: white;
  border: none;
}
</style>
