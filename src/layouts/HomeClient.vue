<template>
  <NavBar></NavBar>
  <router-view></router-view>
  <Footer></Footer>
  <BookingConfirm v-if="customer != null"></BookingConfirm>
</template>

<script>
import NavBar from '@/components/client/NavBar.vue';
import Footer from '@/components/client/Footer.vue';
import BookingConfirm from '@/components/client/BookingConfirm.vue';

import { mapState } from 'vuex';
export default {
  components: {
    NavBar,
    Footer,
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
