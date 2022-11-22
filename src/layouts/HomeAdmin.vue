<template>
  <div class="container-body">
    <div class="body">
      <div class="sticky-top">
        <Header />
        <!-- <TopBar /> -->
      </div>
      <div>
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/admin/Header';
// import TopBar from '@/components/admin/TopBar';

export default {
  name: 'Home',
  components: {
    // TopBar,
    Header,
  },
};
</script>
<style scoped>
.container-body {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 50px 140px 0px 140px;
  background-image: linear-gradient(to bottom right, #edf2ff, #fff3bf);
}
.body {
  background-color: #f8f9fa;
  height: 100vh;
  border-top-left-radius: 26px;
  border-top-right-radius: 26px;
  overflow: scroll;
  padding-bottom: 100px;
}
</style>
