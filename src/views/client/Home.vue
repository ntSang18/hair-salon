<template>
  <div>
    <section v-if="!ads.length" id="hero">
      <div class="hero-content">
        <div>
          <h1>Enhance your <strong>natural beauty</strong></h1>
          <p>Let your grow with our professional care</p>
          <button @click="navigateBooking()" class="btn1">BOOK ONLINE</button>
        </div>
        <img src="@/assets/client/images/header.png" />
      </div>
    </section>
    <section v-else id="ad">
      <swiper
        :pagination="{
          clickable: true,
        }"
        :autoplay="{
          delay: 5000,
        }"
        :loop="true"
        :modules="modules"
        class="ad-container"
      >
        <swiper-slide v-for="ad in ads" :key="ad.Id" class="ad-item" @click="routeAd(ad.Id)">
          <img src="https://hairsalonchitam.vn/wp-content/uploads/2022/06/checkin_banner-1536x496.png" />
        </swiper-slide>
      </swiper>
    </section>

    <section id="banner1">
      <div class="banner1-container">
        <h2>Change myself</h2>
        <p>Become the best version of yourself</p>
      </div>
    </section>

    <section id="feature" class="section-p1">
      <div class="feature-container">
        <div class="group-box">
          <div class="feature-box">
            <img src="@/assets/client/images/features/feature1.png" />
            <div class="cap">
              <h5>Premium curling pills</h5>
              <p>Thoroughly tested and selected</p>
            </div>
          </div>
          <div class="feature-box">
            <img src="@/assets/client/images/features/feature2.png" />
            <div class="cap">
              <h5>Modern equipment</h5>
              <p>Upgrade your beauty experience</p>
            </div>
          </div>
        </div>
        <div class="group-box">
          <div class="feature-box">
            <img src="@/assets/client/images/features/feature4.png" />
            <div class="cap">
              <h5>Skilled stylist</h5>
              <p>Thorough recruitment, intensive training</p>
            </div>
          </div>
          <div class="feature-box">
            <img src="@/assets/client/images/features/feature3.png" />
            <div class="cap">
              <h5>Various styles</h5>
              <p>A variety of styles to suit all face shapes</p>
            </div>
          </div>
        </div>
      </div>
      <div class="feature-details">
        <h2>Our Features</h2>
        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>

        <div class="feature-list">
          <div>
            <img src="@/assets/client/images/logo/check.png" />
            <h5>High-quality stylists</h5>
          </div>
          <div>
            <img src="@/assets/client/images/logo/check.png" />
            <h5>Highly Skilled Stylist</h5>
          </div>
          <div>
            <img src="@/assets/client/images/logo/check.png" />
            <h5>Various hairstyles</h5>
          </div>
          <div>
            <img src="@/assets/client/images/logo/check.png" />
            <h5>Modern equipment</h5>
          </div>
          <div>
            <img src="@/assets/client/images/logo/check.png" />
            <h5>Large salon easy to find</h5>
          </div>
          <div>
            <img src="@/assets/client/images/logo/check.png" />
            <h5>Music experience</h5>
          </div>
        </div>
      </div>
    </section>

    <section id="services" class="section-p1">
      <div class="title">
        <h2>Top Services</h2>
        <p>Our top 10 most booked services</p>
      </div>
      <swiper
        :slides-per-view="2"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :space-between="50"
        :loop="true"
        :freeMode="true"
        :modules="modules"
        class="services-container"
      >
        <swiper-slide v-for="s in services" :key="s.Id" class="service-box">
          <img :src="s.image" />
          <div class="details">
            <h4>{{ s.name }}</h4>
            <span>{{ s.description }}</span>
            <strong>Price: {{ numberToPrice(s.price) }}</strong>
            <button>READ MORE</button>
          </div>
        </swiper-slide>
      </swiper>
    </section>

    <section id="time" class="section-p1">
      <div class="time-container">
        <h2>Working Time</h2>
        <p>
          If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden
          in the middle.
        </p>
        <div class="time-line">
          <h5>Weekdays:</h5>
          <h5>9am - 5pm</h5>
        </div>
        <div class="time-line">
          <h5>Monday:</h5>
          <h5>10am - 7pm</h5>
        </div>
        <div class="time-line">
          <h5>Sunday:</h5>
          <h5>Closed</h5>
        </div>
      </div>
      <div class="img-container">
        <img src="@/assets/client/images/time.png" />
      </div>
    </section>

    <section id="stylists" class="section-p1">
      <div class="title">
        <h2>Top Stylists</h2>
        <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
      </div>
      <div class="ranks">
        <div v-for="(stylist, index) in stylists" :key="index" class="rank-item">
          <div :class="'rank rank-' + (index + 1)">{{ index + 1 }}</div>
          <div class="item">
            <img v-if="stylist" :src="stylist.imagePath" />
            <img v-else src="@/assets/client/images/experts/p2.png" />
            <div class="rank-item-details">
              <div class="header">
                <h4>{{ stylist.name }}</h4>
                <p>
                  <strong>{{ stylist._count.bills }}</strong> booking done
                </p>
              </div>
              <div class="stars">
                <p>{{ stylist.avg }} stars</p>
                <el-rate v-model="stylist.avg" size="small" disabled text-color="#ff9900" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section id="banner2">
      <div class="banner2-container">
        <div class="banner2-content">
          <h2>Stylists</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam inventore aspernatur nihil, omnis quo nisi
            exercitationem ipsum consequuntur. Et fugit quas sit quia. Aut asperiores optio eveniet, officiis quisquam
            eaque.
          </p>
        </div>
      </div>
    </section>

    <section id="experts" class="section-p1">
      <h2>Meet Our Experts</h2>
      <p>Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text</p>
      <div class="experts-container">
        <div class="expert-box">
          <img src="@/assets/client/images/experts/p1.png" />
          <div class="details">
            <h5>Thanh Sang</h5>
            <p>Frontend Developer</p>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            <div class="links">
              <a href="">
                <img src="@/assets/client/images/logo/facebook.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/linkedin.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/gmail.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="expert-box">
          <img src="@/assets/client/images/experts/p5.png" />
          <div class="details">
            <h5>Văn Trường</h5>
            <p>Frontend Developer</p>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            <div class="links">
              <a href="">
                <img src="@/assets/client/images/logo/facebook.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/linkedin.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/gmail.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="expert-box">
          <img src="@/assets/client/images/experts/p3.png" />
          <div class="details">
            <h5>Quỳnh Nga</h5>
            <p>Backend Developer</p>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            <div class="links">
              <a href="">
                <img src="@/assets/client/images/logo/facebook.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/linkedin.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/gmail.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="expert-box">
          <img src="@/assets/client/images/experts/p4.png" />
          <div class="details">
            <h5>Phú Thành</h5>
            <p>Mobile Developer</p>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            <div class="links">
              <a href="">
                <img src="@/assets/client/images/logo/facebook.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/linkedin.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/gmail.png" />
              </a>
            </div>
          </div>
        </div>
        <div class="expert-box">
          <img src="@/assets/client/images/experts/p5.png" />
          <div class="details">
            <h5>Văn Hùng</h5>
            <p>Backend Developer</p>
            <span>Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
            <div class="links">
              <a href="">
                <img src="@/assets/client/images/logo/facebook.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/linkedin.png" />
              </a>
              <a href="">
                <img src="@/assets/client/images/logo/gmail.png" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue/swiper-vue.js';
import 'swiper/swiper-bundle.css';
import { Pagination, Autoplay, Navigation, FreeMode, Mousewheel } from 'swiper';

import ServiceService from '@/services/ServiceService';
import StaffService from '@/services/StaffService';
import AdvertisementService from '@/services/AdvertisementService';
import numberToPrice from '@/utils/numberToPrice';
export default {
  name: 'Home',
  data() {
    return {
      services: [],
      stylists: [],
      ads: [],
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    navigateBooking() {
      this.$router.push('/salon/booking');
    },
    async getData() {
      let res = await Promise.all([
        ServiceService.getServices(),
        StaffService.getBarberRankings(),
        AdvertisementService.getAds(),
      ]);
      if (res[0].status == '200') {
        this.services = res[0].data.filter(service => !service.isDeleted);
      }
      if (res[1].status == '200') {
        if (res[1].data.staffs.length <= 5) {
          this.stylists = res[1].data.staffs;
        } else {
          for (let index = 0; index < 5; index++) {
            this.stylists.push(res[1].data.staffs[index]);
          }
        }
      }
      if (res[2].status == '200') {
        this.ads = res[2].data.filter(ad => {
          let now = new Date().getTime();
          let startDate = new Date(ad.startDate.split('T')[0]).getTime();
          let endDate = new Date(ad.endDate.split('T')[0]).getTime();
          return startDate <= now && endDate >= now;
        });
      }
    },
    routeAd(Id) {
      this.$router.push(`/salon/advertisement/${Id}`);
    },
    numberToPrice(number) {
      return numberToPrice(number);
    },
  },
  components: {
    Swiper,
    SwiperSlide,
  },
  setup() {
    return {
      modules: [Pagination, Autoplay, Navigation, FreeMode, Mousewheel],
    };
  },
};
</script>
