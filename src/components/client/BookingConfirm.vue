<template>
  <section id="appointment">
    <el-popover
      :width="400"
      placement="left"
      popper-style="box-shadow: rgb(14 18 22 / 35%) 0px 10px 38px -10px, rgb(14 18 22 / 20%) 0px 10px 20px -15px; padding: 20px;"
    >
      <template #reference>
        <el-badge :is-dot="hasAppointment" class="item">
          <img id="appointment-icon" src="@/assets/client/images/logo/appointment.png" />
        </el-badge>
      </template>
      <template #default>
        <div class="booking-confirm">
          <div v-if="!hasAppointment" class="booking-confirm-message">
            You don't have any confirmed appointments yet
          </div>
          <div v-else class="booking-confirm-container">
            <div class="booking-confirm-item">
              <div class="date-time">
                <div class="date">{{ timer.date }}</div>
                <div class="time">{{ timer.timeSlot }}</div>
              </div>
              <div class="countdown-timer">
                <div class="timer-item">
                  <h3>{{ timer.days }}</h3>
                  <span>Days</span>
                </div>
                <div class="timer-item">
                  <h3>{{ timer.hours }}</h3>
                  <span>Hours</span>
                </div>
                <div class="timer-item">
                  <h3>{{ timer.minutes }}</h3>
                  <span>Minutes</span>
                </div>
                <div class="timer-item">
                  <h3>{{ timer.seconds }}</h3>
                  <span>Seconds</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-popover>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import BookingService from '@/services/BookingService';
export default {
  data() {
    return {
      booking: null,
      interval: null,
      timer: null,
    };
  },
  mounted() {
    this.eventBus.on('resetBookingConfirmData', () => {
      this.getData();
    });
    this.getData();
    this.countdown();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapState(['customer']),
    hasAppointment() {
      if (this.timer) {
        return true;
      }
      return false;
    },
  },
  methods: {
    async getData() {
      if (this.customer != null) {
        const res = await BookingService.getBookingsConfirmed(this.customer.Id);
        if (res.status == '200') {
          this.booking = res.data.bookings.map(booking => {
            return {
              Id: booking.Id,
              date: booking.date.split('T')[0],
              timeSlot: booking.timeSlot,
            };
          })[0];
        }
      }
    },
    countdown() {
      this.interval = setInterval(() => {
        this.timer = null;
        var now = new Date().getTime();
        let tempTimeSlot = this.booking.timeSlot.length < 5 ? '0' + this.booking.timeSlot : this.booking.timeSlot;
        let bookingTime = new Date(this.booking.date + ' ' + tempTimeSlot).getTime();
        let distance = bookingTime - now;
        if (distance > 0) {
          this.timer = {
            Id: this.booking.Id,
            date: this.booking.date,
            timeSlot: this.booking.timeSlot,
            expired: false,
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000),
          };
        }
      });
    },
  },
  watch: {
    customer() {
      this.getData();
    },
  },
};
</script>
