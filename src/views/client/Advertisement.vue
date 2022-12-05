<template>
  <div class="ad-item">
    <img :src="ad.imagePath" />
    <div class="ad-item-details">
      <div class="header">
        <a href="#">Special offers</a>
        <h1>{{ ad.title }}</h1>
        <div class="line"></div>
      </div>
      <p class="form-to">
        From <strong>{{ ad.startDate }}</strong> to <strong>{{ ad.endDate }}</strong>
      </p>
      <div class="percent-code">
        Enter code
        <p>{{ ad.voucherCode }}</p>
        when booking to get
        <strong>{{ ad.discount }}%</strong>
        off total amount
      </div>
      <span>
        {{ ad.detail }}
      </span>
    </div>
  </div>
</template>
<script>
import AdvertisementService from '@/services/AdvertisementService';

export default {
  props: ['aid'],
  data() {
    return {
      ad: {},
    };
  },
  beforeMount() {
    this.getData();
  },
  methods: {
    async getData() {
      const res = await AdvertisementService.getAd(this.aid);
      if (res.status == 200) {
        this.ad = res.data;
        this.ad.startDate = this.ad.startDate.split('T')[0];
        this.ad.endDate = this.ad.endDate.split('T')[0];
      }
    },
  },
};
</script>
