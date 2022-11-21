<template>
  <section id="page-header" class="booking-history">
    <div class="header-content">
      <h2>Take care of your hair</h2>
      <p>Make an appointment with us now</p>
    </div>
  </section>

  <section id="booking-history" class="section-p1">
    <h2>Booking History</h2>
    <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
    <div class="table-container">
      <el-table
        :data="filterTableData"
        :default-sort="{ prop: 'date' }"
        style="width: 100%"
        :row-class-name="tableRowClassName"
      >
        <el-table-column prop="date" label="Date" sortable width="150" />
        <el-table-column prop="services" label="Services" />
        <el-table-column prop="stylist" label="Stylist" width="150" />
        <el-table-column
          prop="status"
          label="Status"
          width="150"
          :filters="[
            { text: 'Pending', value: 'Pending' },
            { text: 'Process', value: 'Process' },
            { text: 'Completed', value: 'Completed' },
          ]"
          :filter-method="filterTag"
          filter-placement="bottom-end"
        >
          <template #default="scope">
            <el-tag>{{ scope.row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column align="right">
          <template #header>
            <el-input v-model="search" size="small" placeholder="Type to search" />
          </template>
          <template #default="scope">
            <el-button
              :disabled="!cancelableBooking(scope.row)"
              size="small"
              @click="handleCancel(scope.$index, scope.row)"
              >Cancel</el-button
            >
            <el-button
              :disabled="!ratableBooking(scope.$index)"
              type="primary"
              size="small"
              @click="openRateDialog(scope.$index)"
              >Rating</el-button
            >
            <el-button size="small" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pagination.pageSize"
        :page-count="pagination.totalPage"
        v-model:current-page="pagination.page"
        @current-change="getBookingHistory()"
      />
    </div>

    <el-dialog v-model="dialogCreate" width="35%" center>
      <template #header>
        <span class="header-dialog">Rating stylist</span>
      </template>
      <template #default>
        <div class="rating">
          <div class="star-widget">
            <input type="radio" id="rate-5" :value="5" v-model="rate" />
            <label for="rate-5" class="bx bxs-star"></label>
            <input type="radio" id="rate-4" :value="4" v-model="rate" />
            <label for="rate-4" class="bx bxs-star"></label>
            <input type="radio" id="rate-3" :value="3" v-model="rate" />
            <label for="rate-3" class="bx bxs-star"></label>
            <input type="radio" id="rate-2" :value="2" v-model="rate" />
            <label for="rate-2" class="bx bxs-star"></label>
            <input type="radio" id="rate-1" :value="1" v-model="rate" />
            <label for="rate-1" class="bx bxs-star"></label>
          </div>
          <form action="#">
            <header id="header-review">&nbsp; {{ ratingReview }}</header>
            <div class="textarea">
              <textarea name="review" cols="40" placeholder="Describer your experience..."></textarea>
            </div>
          </form>
        </div>
      </template>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogCreate = false">Cancel</el-button>
          <el-button type="primary" @click="handleRate()"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </section>

  <section id="newsletter">
    <div class="newstext">
      <h4>Sign Up For Newsletters</h4>
      <p>
        Get E-mail updates about our services and
        <span>special offers.</span>
      </p>
    </div>
    <div class="form">
      <input type="text" placeholder="Your email address" />
      <button>Sign up</button>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import BookingService from '@/services/BookingService';
import RateService from '@/services/RateService';

export default {
  name: 'Booking History',
  data() {
    return {
      bookings: [],
      search: '',
      dialogCreate: false,
      bookingRating: null,
      ratingReview: '',
      comment: '',
      rate: 0,
      pagination: {
        pageSize: 5,
        totalPage: 10,
        page: 1,
      },
    };
  },
  mounted() {
    this.getBookingHistory();
  },
  computed: {
    ...mapState(['customer']),
    filterTableData() {
      return this.bookings.filter(data => {
        return (
          !this.search ||
          data.service.toLowerCase().includes(this.search.toLowerCase()) ||
          data.stylist.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    async getBookingHistory() {
      const res = await BookingService.getBookingHistory(
        this.customer.Id,
        this.pagination.page,
        this.pagination.pageSize,
      );
      if (res.status == '200') {
        this.bookings = this.getBookingsFromResponse(res);
        this.pagination.totalPage = res.data.totalPage;
      }
    },
    getBookingsFromResponse(res) {
      return res.data.bookings.map(booking => {
        let services = [];
        services = booking.details.map(detail => detail.service.name);
        let strServices = '';
        services.forEach((service, index) => {
          if (index == services.length - 1) {
            strServices += `${index + 1}. ${service}`;
          } else {
            strServices += `${index + 1}. ${service} \n`;
          }
        });
        return {
          Id: booking.Id,
          date: booking.date.split('T')[0],
          services: strServices,
          stylist: booking.staff.name,
          status: booking.status,
          isRated: booking.rate ? true : false,
        };
      });
    },
    cancelableBooking(booking) {
      return booking.status === 'Confirm' || booking.status === 'Pending';
    },
    ratableBooking(index) {
      return this.bookings[index].status === 'Done' && !this.bookings[index].isRated;
    },
    tableRowClassName(row) {
      if (row.row.status === 'Pending') {
        return 'pending-row';
      } else if (row.row.status === 'Done') {
        return 'done-row';
      } else if (row.row.status === 'Cancel') {
        return 'cancel-row';
      }
      return 'confirm-row';
    },
    async handleCancel(index, booking) {
      if (this.cancelableBooking(booking)) {
        const obj = {
          Id: booking.Id,
          status: 'Cancel',
        };
        const res = await BookingService.updateBooking(obj);
        if (res.status == '200') {
          if (booking.status == 'Confirm') {
            console.log('confirmBooking');
            this.eventBus.emit('resetBookingConfirmData');
          }
          this.$store.state.toast.success('Cancel successful!');
          this.bookings[index].status = 'Cancel';
        } else {
          this.$store.state.toast.error('Cancel failed!');
        }
      }
    },
    openRateDialog(index) {
      this.dialogCreate = !this.dialogCreate;
      this.bookingRating = this.bookings[index];
    },
    async handleRate() {
      if (this.ratableBooking) {
        const obj = {
          rate: this.rate,
          comment: this.comment,
          bookingId: this.bookingRating.Id,
        };
        const res = await RateService.createRate(obj);
        this.dialogCreate = false;
        if (res.status == '200') {
          this.$store.state.toast.success('Rating successful!');
        } else {
          this.$store.state.toast.error('Rating failed!');
        }
      }
    },
    async handleDelete(index) {
      const id = this.bookings[index].Id;
      const res = await BookingService.softDeleteBooking(id);
      console.log(res);
      if (res.status == '200') {
        this.bookings.splice(index, 1);
        this.$store.state.toast.success('Delete successful!');
      } else {
        this.$store.state.toast.error('Delete failed!');
      }
    },
    filterTag(value, row) {
      return row.status === value;
    },
  },
  watch: {
    dialogCreate() {
      if (this.dialogCreate == false) {
        this.rate = 0;
        this.bookingRating = null;
        this.ratingReview = '';
        this.comment = '';
      }
    },
    rate() {
      if (this.rate == 1) {
        this.ratingReview = 'I just hate it 😠';
      } else if (this.rate == 2) {
        this.ratingReview = "I don't like it 😒";
      } else if (this.rate == 3) {
        this.ratingReview = 'It is awesome 😊';
      } else if (this.rate == 4) {
        this.ratingReview = 'I just like it 😎';
      } else if (this.rate == 5) {
        this.ratingReview = 'I just love it 😍';
      } else {
        this.ratingReview = '';
      }
    },
  },
};
</script>
