<template>
  <div class="content container padding-left-right">
    <Title title="My booking" />
    <div class="d-flex justify-content-between">
      <div>
        <!-- <el-date-picker v-model="date" type="date" placeholder="Pick a day" size="default" /> -->
        <el-date-picker
          v-model="date"
          type="daterange"
          unlink-panels
          range-separator="To"
          start-placeholder="Start date"
          end-placeholder="End date"
          :shortcuts="shortcuts"
          :size="size"
        />
      </div>
      <div class="d-flex justify-content-between">
        <el-select v-model="timeSlot" class="w-75" clearable placeholder="Time Slot ...">
          <el-option v-for="item in timeSlots" :key="item" :label="item" :value="item" />
        </el-select>
        <el-select v-model="status" class="w-75" clearable placeholder="Status ...">
          <el-option v-for="item in statusOption" :key="item" :label="item" :value="item" />
        </el-select>
      </div>
    </div>
    <div class="content-my-booking">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item v-for="item in bookings" :key="item.Id">
          <template #title>
            <div class="w-100 d-flex justify-content-between align-items-center">
              <div class="date">
                {{ item.date }}
              </div>
              <div class="timeslot">
                {{ item.timeSlot }}
              </div>
              <div class="date" style="width: 25%">
                {{ item.customer.name }}
              </div>
              <div :class="['status', item.status]">
                {{ item.status }}
              </div>
            </div>
          </template>
          <template #default>
            <div
              v-for="detail in item.details"
              :key="detail.Id"
              style="border-bottom: 1px solid #dee2e6"
              class="service"
            >
              <div class="service-name">
                {{ detail.service.name }}
              </div>
              <div class="service-price">{{ detail.service.price }} VNĐ</div>
            </div>
          </template>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
import { timeSlots } from '@/common/timeSlot';
import Title from '@/components/admin/Title';
import BookingService from '@/services/BookingService';
export default {
  components: {
    Title,
  },
  data() {
    return {
      date: [new Date(), new Date()],
      status: null,
      timeSlot: null,
      statusOption: ['Pending', 'Confirm', 'Done', 'Cancel'],
      bookings: [],
    };
  },
  computed: {
    timeSlots() {
      return timeSlots;
    },
  },
  watch: {
    status: function () {
      this.filter();
    },
    timeSlot: function () {
      this.filter();
    },
    date: function () {
      if (!this.date) this.date = [new Date(), new Date()];
      this.getMyBooking();
    },
  },
  mounted() {
    this.getMyBooking();
  },
  methods: {
    async getMyBooking() {
      this.reset();
      const response = await BookingService.getBookingByStaff(this.$route.params.id, this.date[0], this.date[1]);
      if (response && response.status == '200') {
        this.bookings = response.data.bookings.map(el => {
          return { ...el, date: el.date.slice(0, 10) };
        });
        this.constBookings = [...this.bookings];
      }
    },
    reset() {
      this.status = null;
      this.timeSlot = null;
      this.constBookings = [];
      this.bookings = [];
    },
    filter() {
      if (this.status && this.timeSlot)
        this.bookings = this.constBookings.filter(el => {
          return el.status == this.status && el.timeSlot.includes(this.timeSlot);
        });
      else if (this.status)
        this.bookings = this.constBookings.filter(el => {
          return el.status == this.status;
        });
      else if (this.timeSlot)
        this.bookings = this.constBookings.filter(el => {
          return el.timeSlot.includes(this.timeSlot);
        });
      else this.bookings = [...this.constBookings];
    },
  },
};
</script>

<style scoped>
.content-my-booking {
  margin: 20px 0px;
  font-size: 20px;
}
.date,
.timeslot,
.status {
  font-size: 18px;
}
.date {
  padding-left: 30px;
}
.status {
  border: 1px solid #dee2e6;
  width: 120px;
  border-radius: 10px;
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin-right: 30px;
  color: white;
}
.Cancel {
  background-color: #fa5252;
  color: white;
}
.Confirm {
  background-color: #40c057;
}
.Pending {
  background-color: #fcc419;
}
.Done {
  background-color: #94d82d;
}
.service-name {
  padding-left: 60px;
  font-size: 16px;
  display: inline-block;
}
.service-price {
  font-size: 16px;
  display: inline-block;
}
.service {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 60px 10px 0px;
}
</style>
