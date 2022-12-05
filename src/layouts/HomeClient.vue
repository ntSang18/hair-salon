<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <NewsLetter></NewsLetter>
  <Footer></Footer>
  <BookingConfirm v-if="customer != null"></BookingConfirm>
</template>

<script>
import NavBar from '@/components/client/NavBar.vue';
import Footer from '@/components/client/Footer.vue';
import NewsLetter from '@/components/client/NewsLetter.vue';
import BookingConfirm from '@/components/client/BookingConfirm.vue';

import { mapState } from 'vuex';
export default {
  components: {
    NavBar,
    Footer,
    NewsLetter,
    BookingConfirm,
  },
  computed: {
    ...mapState(['customer']),
  },
};
const sidebar = () => {
  const sidebar = document.querySelector('.sidebar');
  const h = 310;
  let scrollPos = window.scrollY;
  if (scrollPos >= h) {
    sidebar.classList.add('overflow');
    // sidebar.classList.add('fixed');
  } else {
    sidebar.classList.remove('overflow');
    // sidebar.classList.remove('fixed');
  }
};
window.addEventListener('scroll', sidebar);
</script>
