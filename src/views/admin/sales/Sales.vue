<template>
  <div class="container padding-left-right">
    <Title title="Sales" />
    <div class="d-flex justify-content-center">
      <div class="d-flex align-items:center">
        <div style="margin-right: 20px">Month:</div>
        <el-select v-model="month">
          <el-option v-for="item in monthSelect" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
      <div class="d-flex">
        <div style="margin: 0px 30px">Year:</div>
        <el-select v-model="year">
          <el-option v-for="item in yearSelect" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
    </div>

    <div v-if="booking.all">
      <div
        style="
          margin-left: 30px;
          margin-top: 20px;
          padding-left: 20px;
          font-weight: 600;
          border-left: 10px solid #6741d9;
        "
      >
        Bill
      </div>
      <el-table
        ref="multipleTableRef"
        :data="billPaginate.all"
        border
        @selection-change="handleSelectionChange"
        style="margin: 30px 0px 20px 0px"
      >
        <el-table-column label="Customer">
          <template #default="scope">
            <div>
              {{ scope.row.customer.name || '__' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Staff">
          <template #default="scope">
            <div>
              {{ scope.row.staff.name }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="Price">
          <template #default="scope">
            <div>
              {{ convertCurrency(scope.row.price) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="createdAt">
          <template #default="scope">
            <div>
              {{ Convert(scope.row.createdAt) }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="BookingId">
          <template #default="scope">
            <div>
              {{ scope.row.bookingId || '__' }}
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="d-flex justify-content-center"
        :page-size="billPaginate.pageSize"
        layout="prev, pager, next"
        :page-count="billPaginate.totalPage"
        v-model:currentPage="billPaginate.page"
        @current-change="getBillPaginates"
      >
      </el-pagination>
    </div>
    <div v-if="booking.all">
      <div
        style="
          margin-left: 30px;
          margin-top: 20px;
          padding-left: 20px;
          font-weight: 600;
          border-left: 10px solid #6741d9;
        "
      >
        {{ month }}-{{ year }}
      </div>
      <div class="d-flex justify-content-around">
        <div class="d-flex flex-column justify-content-between align-items-center" style="margin-top: 30px">
          <div class="item">
            <div class="title">BOOKING DONE</div>
            <div class="total">{{ booking.done }}</div>
          </div>
          <div class="item">
            <div class="title">Bill</div>
            <div class="total">{{ bills.totalBill }}</div>
          </div>
          <div class="item">
            <div class="title">TOTAL EARNINGS</div>
            <div class="total">{{ convertCurrency(bills.totalPrices) }}</div>
          </div>
          <div class="item">
            <div class="title">NEW CUSTOMER</div>
            <div class="total" v-if="newCustomers">{{ newCustomers.length }}</div>
          </div>
        </div>
        <div>
          <Doughnut :dataValue="[booking.cancel, booking.done]" />
          <div style="font-weight: 600; text-align: center; margin-top: 10px">Booking</div>
        </div>
      </div>
      <div
        style="
          margin-top: 30px;
          padding-top: 20px;
          text-align: center;
          font-size: 22px;
          color: #495057;
          font-weight: 600;
          border-top: 1px solid #e9ecef;
        "
      >
        Best Barber in {{ month }}
      </div>
      <div class="d-flex justify-content-center">
        <div class="d-flex justify-content-between" style="margin-top: 50px; width: 600px">
          <div class="d-flex flex-column">
            <img class="img" src="" alt="" style="margin-top: 100px" />
            <div class="name" v-if="count.bills[3]">{{ count.bills[3].staff.name }}</div>
            <div v-if="count.bills[3]" class="d-flex justify-content-center">
              <div style="width: 20px">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fab005"
                    d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
                  ></path>
                </svg>
              </div>
              <div style="height: 20px; line-height: 20px; margin-top: 3px">{{ count.bills[3]._count }}</div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <img class="img" src="" alt="" style="margin-top: 50px" />
            <div class="name" v-if="count.bills[1]">{{ count.bills[1].staff.name }}</div>
            <div v-if="count.bills[1]" class="d-flex justify-content-center">
              <div style="width: 20px">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fab005"
                    d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
                  ></path>
                </svg>
              </div>
              <div style="height: 20px; line-height: 20px; margin-top: 3px">{{ count.bills[1]._count }}</div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <img class="img" src="" alt="" />
            <div class="name" v-if="count.bills[0]">{{ count.bills[0].staff.name }}</div>
            <div v-if="count.bills[0]" class="d-flex justify-content-center">
              <div style="width: 20px">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fab005"
                    d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
                  ></path>
                </svg>
              </div>
              <div style="height: 20px; line-height: 20px; margin-top: 3px">{{ count.bills[0]._count }}</div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <img class="img" src="" alt="" style="margin-top: 50px" />
            <div class="name" v-if="count.bills[2]">{{ count.bills[2].staff.name }}</div>
            <div v-if="count.bills[2]" class="d-flex justify-content-center">
              <div style="width: 20px">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fab005"
                    d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
                  ></path>
                </svg>
              </div>
              <div style="height: 20px; line-height: 20px; margin-top: 3px">{{ count.bills[2]._count }}</div>
            </div>
          </div>
          <div class="d-flex flex-column">
            <img class="img" src="" alt="" style="margin-top: 100px" />
            <div class="name" v-if="count.bills[4]">{{ count.bills[4].staff.name }}</div>
            <div v-if="count.bills[4]" class="d-flex justify-content-center">
              <div style="width: 20px">
                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa="">
                  <path
                    fill="#fab005"
                    d="M192 128v768h640V128H192zm-32-64h704a32 32 0 0 1 32 32v832a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V96a32 32 0 0 1 32-32zm160 448h384v64H320v-64zm0-192h192v64H320v-64zm0 384h384v64H320v-64z"
                  ></path>
                </svg>
              </div>
              <div style="height: 20px; line-height: 20px; margin-top: 3px">{{ count.bills[4]._count }}</div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          style="
            margin-top: 30px;
            padding-top: 20px;
            text-align: center;
            font-size: 22px;
            color: #495057;
            font-weight: 600;
            border-top: 1px solid #e9ecef;
          "
        >
          Sales in {{ year }}
        </div>
        <BarChart />
      </div>
    </div>
    <div v-else style="font-size: 22px; font-weight: 600; margin-top: 20px; text-align: center">No data !</div>
  </div>
</template>

<script>
import Title from '@/components/admin/Title';
import StaffService from '@/services/StaffService';
import BillService from '@/services/BillService';
import CustomerService from '@/services/CustomerService';
import BookingService from '@/services/BookingService';
import ConvertNpm from '@hvtruong2209/convert-datetime';

import BarChart from '@/components/admin/BarChart';
import Doughnut from '@/components/admin/DoughnutChart';

export default {
  components: {
    Title,
    BarChart,
    Doughnut,
  },
  data() {
    return {
      monthSelect: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      yearSelect: [2021, 2022, 2023, 2024, 2025, 2026],
      month: 10,
      year: 2022,
      startDate: '',
      endDate: '',
      staffs: [],
      barbers: [],
      count: {
        // barber
        rates: [],
        bills: [],
      },
      newCustomers: [],
      booking: {
        all: [],
        done: 0,
        cancel: 0,
      },
      bills: {
        all: [],
        totalPrices: 0,
        totalBill: 0,
      },
      billPaginate: {
        all: [],
        page: 1,
        pageSize: 10,
        totalPage: 0,
      },
    };
  },
  watch: {
    month() {
      this.init();
    },
    year() {
      this.init();
    },
  },
  mounted() {
    this.init();
    const date = new Date();
    this.month = date.getMonth() + 1;
    this.year = date.getFullYear();
  },
  methods: {
    Convert(datetime) {
      return ConvertNpm.dateToString(datetime);
    },
    init() {
      this.booking = {};
      this.bills = {};
      this.staffs = [];
      this.startDate = `${this.year}-${this.month}-1`;
      this.endDate = `${this.year}-${this.month}-30`;
      this.getTopStaffs();
      this.getNewCustomer();
      this.getBooking();
      this.getBills();
      this.getBillPaginates();
    },
    sortArr(arrParam, option) {
      let arr = [...arrParam];
      if (option == 'rate') {
        arr.sort(function (a, b) {
          return b._count.rates - a._count.rates;
        });
      }
      if (option == 'booking') {
        arr.sort(function (a, b) {
          return b._count.bills - a._count.bills;
        });
      }
      return [...arr.splice(0, 5)];
    },
    async getTopStaffs() {
      const response = await StaffService.searchStaffs();
      if (response && response.status == '200') {
        this.staffs = response.data.staffs;
        this.barbers = this.staffs.filter(el => el.roleId == 2);
      }
      this.count.rates = this.sortArr(this.barbers, 'rate');

      const responseBill = await BillService.saleStaffWithBill(this.startDate, this.endDate);

      if (responseBill && responseBill.status == '200') {
        this.count.bills = responseBill.data;
      }
    },
    async getNewCustomer() {
      const response = await CustomerService.getNewCustomers();
      if (response && response.status == '200') {
        this.newCustomers = response.data.customers;
      }
    },
    async getBooking() {
      const response = await BookingService.getBookings(this.startDate, this.endDate);
      if (response && response.status == '200') {
        this.booking.all = response.data.bookings;
        this.booking.done = this.booking.all.filter(el => el.status == 'Done').length;
        this.booking.cancel = this.booking.all.filter(el => el.status == 'Cancel').length;
      }
    },
    async getBills() {
      const response = await BillService.getBills(this.startDate, this.endDate, null, null);
      if (response && response.status == '200') {
        this.bills.all = response.data.bills;
        this.bills.totalPrices = this.bills.all.reduce((a, b) => a + b.price, 0);
        this.bills.totalBill = this.bills.all.length;
      }
    },
    async getBillPaginates() {
      const response = await BillService.getBills(
        this.startDate,
        this.endDate,
        this.billPaginate.page,
        this.billPaginate.pageSize,
      );
      if (response && response.status == '200') {
        this.billPaginate.all = response.data.bills;
        this.billPaginate.totalPage = response.data.totalPage;
      }
    },
    convertCurrency(vnd) {
      return vnd.toLocaleString('vi', { style: 'currency', currency: 'VND' });
    },
  },
};
</script>

<style scoped>
.item {
  width: 220px;
  height: 100px;
  border-radius: 5px;
  border: 1px solid #dee2e6;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 2px solid #fab005;
  transition-duration: 0.5s;
  margin-top: 20px;
}
.item:hover {
  box-shadow: 0 5px 15px rgb(250, 176, 5, 0.9);
}
.img {
  height: 100px;
  width: 100px;
  border-radius: 50%;
  border: 3px solid #fab005;
  overflow: hidden;
}
.name {
  text-align: center;
}
</style>
