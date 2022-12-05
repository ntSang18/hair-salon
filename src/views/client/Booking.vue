<template>
  <div class="booking-single-screen">
    <div class="body relative">
      <div class="new-top-navigator poiter">
        <span class="text-center">Booking</span>
      </div>
      <div class="main-screen">
        <!-- Service -->
        <div :class="'main-screen-block ' + isServiceDone" id="booking-service">
          <div class="first-item"></div>

          <div class="block-title">1. Choose Service</div>

          <div class="bot-message">
            <img src="@/assets/client/images/logo//bot_avatar.jpg" />
            <div class="bot-message-content">
              <p>Please select the service in advance</p>
            </div>
          </div>

          <div @click="handleShowService()" class="block-content">
            <div class="icon">
              <img src="@/assets/client/images/logo/cut.png" />
              <div class="animation">
                <div class="ping-fast"></div>
                <div class="point"></div>
              </div>
            </div>
            <div v-if="!listServicePicked.length" class="content">Select services</div>
            <div v-else class="content">{{ `Selected ${listServicePicked.length} service` }}</div>
            <img v-if="service.showService" src="@/assets/client/images/logo/down-arrow.png" class="arrow" />
            <img v-else src="@/assets/client/images/logo/right-arrow.png" class="arrow" />
          </div>

          <div :class="`warning-message ${service.showWarning}`">
            Please select the service first to choose the cutting time
          </div>

          <div v-if="!listServicePicked" class="block-box"></div>
          <div v-else class="block-box">
            <div v-for="item in listServicePicked" :key="item.Id" class="service-item">{{ item.name }}</div>
          </div>

          <div :class="[service.showService ? 'content-container fade-in' : 'content-container hide-service']">
            <div v-for="(st, index) in service.listService" :key="st.Id" class="services">
              <div @click="handleShowServiceType(index)" class="service-dropdown">
                <span>{{ st.name }}</span>
                <span
                  ><img
                    v-if="service.showServiceTypes[index]"
                    class="service-dropdown-arrow"
                    src="@/assets/client/images/logo/down.png" />
                  <img v-else class="service-dropdown-arrow" src="@/assets/client/images/logo/right.png"
                /></span>
              </div>
              <div :class="[service.showServiceTypes[index] ? 'content fade-in' : 'content hide-service']">
                <div class="swiper-container swiper-container-service-1">
                  <swiper :slides-per-view="'auto'" :freeMode="true" :modules="modules" class="swiper-wrapper">
                    <swiper-slide v-for="s in st.services" :key="s.Id" class="swiper-slide service-list-item">
                      <img :src="s.image" />
                      <div class="details">
                        <h2>{{ s.name }}</h2>
                        <span>{{ numberToPrice(s.price) }}</span>
                        <input
                          type="radio"
                          :id="'service-' + s.Id"
                          :value="s.Id"
                          v-model="service.servicesPicked[index]"
                        />
                        <label :for="'service-' + s.Id">Choose</label>
                      </div>
                    </swiper-slide>
                  </swiper>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Date, time, stylist -->
        <div :class="'main-screen-block ' + isDTSDone" id="date-time-stylist">
          <div class="next-item"></div>

          <div class="block" id="service-time">
            <div class="block-title">2. Choose date, time & stylist</div>

            <div class="stylist" id="booking-stylist">
              <div class="stylist-dropdown" @click="handleShowStylist()">
                <span><img src="@/assets/client/images/logo/user.png" /></span>
                <span>Choose stylist</span>
                <span
                  ><img
                    v-if="stylist.showStylist"
                    class="stylist-dropdown-arrow"
                    src="@/assets/client/images/logo/down.png"
                  />
                  <img v-else class="stylist-dropdown-arrow" src="@/assets/client/images/logo/right.png" />
                </span>
              </div>

              <div class="bot-message">
                <img src="@/assets/client/images/logo/bot_avatar.jpg" />
                <div class="bot-message-content">
                  <p>Supporter will help you choose the best stylist and other requirements during this salon visit</p>
                </div>
              </div>

              <div :class="[stylist.showStylist ? 'content fade-in' : 'content hide-stylist']">
                <div class="left isActive">
                  <label class="stylist-item" for="stylist-default">
                    <input type="radio" :value="0" id="stylist-default" v-model="stylist.stylistPicked" />
                    <div class="stylist-img">
                      <img
                        class="img-user"
                        src="@/assets/client/images/logo/user-circle.png
												"
                      />
                      <img class="icon-check-default" src="@/assets/client/images/logo/check-circle.png" />
                    </div>
                    <span
                      >Supporter <br />
                      Choose for you</span
                    >
                  </label>
                </div>
                <div class="right">
                  <div class="btn-action btn-left">
                    <img
                      src="
											https://30shine.com/static/media/arrowLeft.7b648ba9.svg"
                    />
                  </div>
                  <div class="btn-action btn-right">
                    <img src="https://30shine.com/static/media/arrowRight.613c1613.svg" />
                  </div>
                  <div class="swiper-container swiper-container-stylist">
                    <swiper
                      :slides-per-view="'auto'"
                      :navigation="{
                        nextEl: '.btn-right',
                        prevEl: '.btn-left',
                        disabledClass: 'btn-hidden',
                      }"
                      :freeMode="true"
                      :modules="modules"
                      class="swiper-wrapper"
                    >
                      <swiper-slide
                        v-for="s in stylist.listStylist"
                        :key="s.Id"
                        class="stylist-item"
                        style="width: 82.5581px"
                      >
                        <label :for="'stylist-' + s.Id">
                          <input type="radio" :value="s.Id" :id="'stylist-' + s.Id" v-model="stylist.stylistPicked" />
                          <div class="stylist-img">
                            <img v-if="s.imagePath" class="img-user" :src="s.imagePath" />
                            <img v-else class="img-user" src="@/assets/client/images/experts/p2.png" />
                            <img class="icon-check-default" src="@/assets/client/images/logo/check-circle.png" />
                          </div>
                          {{ s.name }}
                        </label>
                      </swiper-slide>
                    </swiper>
                  </div>
                </div>
              </div>
            </div>

            <div class="date-container">
              <div id="booking-date">
                <div @click="handleShowDate()" class="block-content">
                  <div class="icon">
                    <img src="@/assets/client/images/logo/calendar.png" />
                  </div>
                  <div class="content">
                    <span>{{ datePicked.toString }}</span>
                    <div :class="`label-day-type ${datePicked.dayType}`">{{ datePicked.dayType }}</div>
                  </div>
                  <img v-if="date.showDate" src="@/assets/client/images/logo/down-arrow.png" class="right-arrow" />
                  <img v-else src="@/assets/client/images/logo/right-arrow.png" class="right-arrow" />
                </div>

                <div :class="[date.showDate ? 'date-filter fade-in' : 'date-filter']">
                  <label v-for="(d, index) in date.listDate" :key="index" class="date-item" :for="'date-' + index">
                    <input
                      type="radio"
                      :id="'date-' + index"
                      :value="index"
                      v-model="date.datePicked"
                      @input="handleShowDate()"
                    />
                    <div class="member-type"></div>
                    <div class="date-item-content">
                      <span> {{ d.toString }} </span>
                      <div :class="`label-day-type ${d.dayType}`">{{ d.dayType }}</div>
                    </div>
                  </label>
                </div>
              </div>
              <div v-if="datePicked.dayType == 'weekend'" class="day-type">
                <strong>Weekend</strong>, the price of services increases by 10%
              </div>
            </div>

            <div id="booking-time">
              <div class="swiper-button-prev">
                <img
                  src="
											https://30shine.com/static/media/arrowLeft.7b648ba9.svg"
                />
              </div>
              <div class="swiper-button-next">
                <img src="https://30shine.com/static/media/arrowRight.613c1613.svg" />
              </div>
              <div class="swiper-container swiper-container-time">
                <swiper
                  :slides-per-view="'auto'"
                  :navigation="{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    disabledClass: 'btn-hidden',
                  }"
                  :freeMode="true"
                  :modules="modules"
                  class="swiper-wrapper"
                >
                  <swiper-slide
                    v-for="(hour, index) in time.timeSlots"
                    :key="index"
                    class="swiper-slide box-time-gr"
                    style="width: 101.048px; margin-right: 8px"
                  >
                    <div v-for="t in hour" :key="t.id" class="box-time-item">
                      <input
                        type="radio"
                        :value="t.time"
                        :disabled="isDisabledTime(t.time)"
                        :id="'time-' + t.id"
                        v-model="time.timePicked"
                      />
                      <label :for="'time-' + t.id"> {{ t.time }} </label>
                    </div>
                  </swiper-slide>
                </swiper>
              </div>
            </div>

            <div id="coupon-note">
              <div class="coupon-note-header">Booking extend</div>
              <div class="coupon">
                <div class="coupon-header">
                  <img src="@/assets/client/images/logo/coupon.png" />
                  Coupon
                </div>
                <div class="coupon-content">
                  <input v-model="extend.coupon" type="text" placeholder="Your discount code..." />
                  <button class="checkCoupon" @click="checkCoupon()">Check coupon</button>
                </div>
                <div
                  v-if="extend.alreadyCheckCoupon"
                  :class="this.ad ? 'coupon-message success' : 'coupon-message error'"
                >
                  {{ couponMessage }}
                </div>
              </div>
              <div class="note">
                <div class="note-header">
                  <img src="@/assets/client/images/logo/note.png" />
                  Note
                </div>
                <div class="note-content">
                  <textarea v-model="extend.note" rows="1" placeholder="E.g: Hair style consultation,..."></textarea>
                </div>
              </div>
            </div>

            <div id="total">
              <div class="total-header">Total bill</div>
              <div class="total-item">
                <div class="total-item-title">
                  <img src="@/assets/client/images/logo/discount.png" />
                  Percent discount by coupon:
                </div>
                <div class="total-item-content">{{ couponPercent }}%</div>
              </div>
              <div class="total-item">
                <div class="total-item-title">
                  <img src="@/assets/client/images/logo/rank.png" />
                  Percent discount by rank:
                </div>
                <div class="total-item-content">{{ rankPercent }}%</div>
              </div>
              <div class="total-item">
                <div class="total-item-title">
                  <img src="@/assets/client/images/logo/money.png" />
                  Total amount:
                </div>
                <div class="total-item-content">{{ numberToPrice(totalPrice) }}</div>
              </div>
              <div class="total-item">
                <div class="total-item-title">
                  <img src="@/assets/client/images/logo/receipt.png" />
                  Receipt:
                </div>
                <div class="total-item-content">{{ numberToPrice(receipt) }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div :class="`booking-footer ${isFormDone}`">
        <button @click="newBooking()" id="booking-submit">Booking</button>
        <span class="sub-description"> After cutting and paying, it's okay to cancel </span>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';
import 'swiper/swiper.min.css';
import { Navigation, FreeMode, Mousewheel } from 'swiper';
import '@/assets/client/styles/booking.css';

import ServiceService from '@/services/ServiceService';
import StaffService from '@/services/StaffService';
import BookingService from '@/services/BookingService';
import NotificationService from '@/services/NotificationService';
import AdvertisementService from '@/services/AdvertisementService';

import { months } from '@/common/month';
import { days } from '@/common/day';
import { times } from '@/common/time';

import numberToPrice from '@/utils/numberToPrice';

import { database, ref, push } from '@/services/firebase';
import { mapState } from 'vuex';

export default {
  data() {
    return {
      service: {
        showService: false,
        listService: [],
        services: [],
        showServiceTypes: [],
        servicesPicked: [],
        showWarning: '',
      },
      stylist: {
        showStylist: false,
        listStylist: [],
        stylistPicked: 0,
      },
      date: {
        showDate: false,
        listDate: [],
        datePicked: 0,
      },
      time: {
        timeSlots: [],
        disabledTimeSlots: [],
        timePicked: '',
      },
      extend: {
        coupon: '',
        alreadyCheckCoupon: false,
        note: '',
      },
      ad: null,
    };
  },
  mounted() {
    this.getData();
  },
  computed: {
    ...mapState(['customer']),
    isServiceDone() {
      const checkPickedService = this.service.servicesPicked.some(val => val != 0);
      if (checkPickedService) {
        return 'done';
      } else {
        return 'active';
      }
    },
    listServicePicked() {
      const listPicked = this.service.servicesPicked.filter(val => val != 0);
      const listServicePicked = [];
      listPicked.forEach(val => {
        listServicePicked.push(this.service.services.find(service => service.Id == val));
      });
      return listServicePicked;
    },
    totalPrice() {
      return this.listServicePicked.reduce((total, item) => total + item.price, 0);
    },
    rankPercent() {
      if (this.customer.customerTypeId == 1) return 15;
      else if (this.customer.customerTypeId == 2) return 10;
      else if (this.customer.customerType == 3) return 5;
      else return 0;
    },
    couponPercent() {
      if (this.ad) {
        return this.ad.discount;
      }
      return 0;
    },
    receipt() {
      let totalPercent = this.couponPercent + this.rankPercent;
      return this.totalPrice * (1 - totalPercent / 100);
    },
    isDTSDone() {
      if (this.isServiceDone == 'done' && this.time.timePicked == 0) {
        return 'active';
      } else if (this.isServiceDone == 'done' && this.time.timePicked != 0) {
        return 'done';
      } else {
        return '';
      }
    },
    isFormDone() {
      if (this.isDTSDone == 'done') {
        return 'active';
      } else {
        return '';
      }
    },
    datePicked() {
      if (this.date.listDate.length) {
        return this.date.listDate[this.date.datePicked];
      }
      let currentDate = new Date();
      let dayType = '';
      if (currentDate.getDay() == 0 || currentDate.getDay() == 6) {
        dayType = 'weekend';
      } else {
        dayType = 'weekday';
      }
      return {
        value: currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate(),
        toString:
          days[currentDate.getDay()] +
          ', ' +
          currentDate.getDate() +
          ' ' +
          months[currentDate.getMonth()] +
          ' ' +
          currentDate.getFullYear(),
        dayType: dayType,
      };
    },
    couponMessage() {
      if (this.ad) {
        return `Valid coupon. Percent discount: ${this.couponPercent}%`;
      }
      return 'Invalid coupon';
    },
  },
  methods: {
    async getData() {
      let res = await Promise.all([ServiceService.getServiceTypes(), StaffService.getBarberRankings()]);
      if (res[0].status == '200' && res[1].status == '200') {
        this.service.listService = res[0].data;
        for (let i = 0; i < this.service.listService.length; i++) {
          this.service.listService[i].services = this.service.listService[i].services.filter(service => {
            return !service.isDeleted;
          });
        }
        this.stylist.listStylist = res[1].data.staffs;
        this.service.listService.forEach(
          serviceType => (this.service.services = this.service.services.concat(serviceType.services)),
        );
        this.service.showServiceTypes = this.service.listService.map(() => false);
        this.service.servicesPicked = this.service.listService.map(() => 0);
        var currentDate = new Date();
        this.date.listDate = this.getDates(currentDate, 7);
        this.date.datePicked = 0;
        this.time.timeSlots = times;
      }
    },
    handleShowService() {
      this.service.showService = !this.service.showService;
    },
    handleShowServiceType(index) {
      this.service.showServiceTypes[index] = !this.service.showServiceTypes[index];
    },
    handleShowStylist() {
      this.stylist.showStylist = !this.stylist.showStylist;
    },
    handleShowDate() {
      if (this.isServiceDone == 'done') {
        this.date.showDate = !this.date.showDate;
      } else {
        this.service.showWarning = 'show';
      }
    },
    getDates(startDate, daysToAdd) {
      var arrDates = [];
      for (var i = 0; i < daysToAdd; i++) {
        var currentDate = new Date();
        currentDate.setDate(startDate.getDate() + i);
        let date = currentDate.getDate().toString().length == 1 ? '0' + currentDate.getDate() : currentDate.getDate();
        let month =
          (currentDate.getMonth() + 1).toString().length == 1
            ? '0' + (currentDate.getMonth() + 1)
            : currentDate.getMonth() + 1;
        let dayType = currentDate.getDay() == 0 || currentDate.getDay() == 6 ? 'weekend' : 'weekday';
        arrDates.push({
          value: currentDate.getFullYear() + '-' + month + '-' + date,
          toString:
            days[currentDate.getDay()] +
            ', ' +
            currentDate.getDate() +
            ' ' +
            months[currentDate.getMonth()] +
            ' ' +
            currentDate.getFullYear(),
          dayType: dayType,
        });
      }
      return arrDates;
    },
    async listDisableTime(date, stylistId, status) {
      this.time.timePicked = '';
      if (stylistId == 0) {
        this.time.disabledTimeSlots = [];
      } else {
        const res = await BookingService.getBookingsByDateAndStaff(date, stylistId, status);
        if (res.status == '200') {
          this.time.disabledTimeSlots = res.data.bookings.map(booking => booking.timeSlot);
        } else {
          // res.status == '204'
          this.time.disabledTimeSlots = [];
        }
      }
    },
    async checkCoupon() {
      if (this.extend.coupon.trim()) {
        const res = await AdvertisementService.checkVoucherCode(this.extend.coupon);
        if (res.status == '200') {
          this.ad = res.data;
        }
        this.extend.alreadyCheckCoupon = true;
      }
    },
    isDisabledTime(timeSlot) {
      let tempTimeSlot = timeSlot.length < 5 ? '0' + timeSlot : timeSlot;
      let currentDate = new Date();
      let dateCheck = new Date(`${this.datePicked.value}T${tempTimeSlot}`);
      if (currentDate.getTime() > dateCheck.getTime()) return true;
      else if (!this.time.disabledTimeSlots.length) return false;
      return this.time.disabledTimeSlots.some(time => time == timeSlot);
    },
    sendNotify() {
      push(ref(database, 'notify'), {
        date: this.datePicked.value,
        customer: this.$store.state.customer.name || this.$store.state.customer.phone,
      });
    },
    async createNotification(obj) {
      await NotificationService.createNotification({ ...obj });
    },

    async newBooking() {
      if (this.isFormDone === 'active') {
        const obj = {
          date: this.datePicked.value,
          timeSlot: this.time.timePicked,
          note: this.extend.note,
          staffId: this.stylist.stylistPicked,
          serviceArray: this.listServicePicked.map(service => parseInt(service.Id)),
        };
        if (this.ad) {
          obj.advertisementId = this.ad.Id;
        }
        const res = await BookingService.createBooking(obj);
        if (res.status == '200') {
          this.$store.state.toast.success('Booking successful!');
          this.sendNotify();
          const obj = {
            name: this.$store.state.customer.name || this.$store.state.customer.phone,
            bookingDate: this.datePicked.value,
            customerId: this.$store.state.customer.Id,
          };
          await this.createNotification(obj);
          // this.clearBookingForm();
        } else {
          this.$store.state.toast.error(res.data);
          // this.clearBookingForm();
        }
      }
    },
    clearBookingForm() {
      this.service.servicesPicked.forEach((v, i) => (this.service.servicesPicked[i] = 0));
      this.stylist.stylistPicked = 0;
      this.date.datePicked = 0;
      this.time.timePicked = '';
    },
    numberToPrice(number) {
      return numberToPrice(number);
    },
  },
  watch: {
    'service.servicesPicked': {
      handler() {
        this.service.showWarning = '';
      },
      deep: true,
    },
    'stylist.stylistPicked'(newValue) {
      let date = this.datePicked.value;
      let stylistId = newValue;
      let status = 'Confirm';
      this.listDisableTime(date, stylistId, status);
    },
    'date.datePicked'() {
      let date = this.datePicked.value;
      let stylistId = this.stylist.stylistPicked;
      let status = 'Confirm';
      this.listDisableTime(date, stylistId, status);
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Navigation, FreeMode, Mousewheel],
    };
  },
};
</script>
