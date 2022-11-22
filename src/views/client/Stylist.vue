<template>
  <section id="page-header" class="stylist">
    <div class="header-content">
      <h2>Our Stylist</h2>
      <p>Choose the best for you</p>
      <div class="inp-group">
        <img src="@/assets/client/images/logo/search.png" />
        <input type="search" placeholder="Search..." v-model="searchStylist" />
      </div>
    </div>
  </section>

  <section id="services-container" class="section-p1">
    <div id="stylist-sidebar" class="sidebar">
      <input type="checkbox" class="showfilter" id="showfilter" />
      <label for="showfilter" class="showfilter-label"></label>
      <div class="sidebar-items">
        <div class="sidebar-item">
          <h4>Filters</h4>
          <label>
            <input type="radio" :value="0" class="filter-item" v-model="filterStylist" />
            <span>Any</span>
          </label>
          <label v-for="i in 5" :key="i">
            <input type="radio" :value="i" class="filter-item" v-model="filterStylist" />
            <span v-if="i == 5">{{ `${i} stars` }}</span>
            <span v-else>{{ `Over ${i} stars` }}</span>
          </label>
        </div>
      </div>
    </div>
    <div class="stylists-content">
      <div class="content-description">
        List of stylists
        <div class="show">
          (<span id="countPosts">{{ stylistsDisplay.length }}</span
          >)
        </div>
      </div>
      <div class="content-items">
        <p v-if="!stylistsDisplay.length" id="empty-message">No matching stylist exists!</p>
        <div v-for="stylist in stylistsDisplay" :key="stylist.Id" class="stylist-box">
          <img v-if="stylist.imagePath" :src="'http://' + stylist.imagePath" />
          <img v-else src="@/assets/client/images/experts/p2.png" />
          <div class="details">
            <h4>{{ stylist.name }}</h4>
            <p>{{ stylist.avg }} stars</p>
            <el-rate v-model="stylist.avg" size="small" disabled text-color="#ff9900" />
          </div>
        </div>
      </div>
    </div>
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
import StaffService from '@/services/StaffService';
export default {
  name: 'Stylist',
  data() {
    return {
      stylists: [],
      filterStylist: 0,
      searchStylist: '',
    };
  },
  mounted() {
    this.getStylist();
  },
  computed: {
    stylistsDisplay() {
      if (this.filterStylist == 0) {
        return this.stylists.filter(stylist => {
          return stylist.name.toLowerCase().includes(this.searchStylist.trim().toLowerCase());
        });
      } else {
        return this.stylists.filter(stylist => {
          return (
            stylist.avg >= this.filterStylist &&
            stylist.name.toLowerCase().includes(this.searchStylist.trim().toLowerCase())
          );
        });
      }
    },
  },
  methods: {
    async getStylist() {
      const res = await StaffService.getBarbers();
      if (res.status == '200') {
        this.stylists = res.data.staffs;
      }
    },
  },
};
</script>
