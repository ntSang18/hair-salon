<template>
  <div class="nav_title">{{ title }}</div>
</template>

<script>
export default {
  props: ['title'],
};
</script>

<style scoped>
.nav_title {
  height: 80px;
  line-height: 80px;
  text-align: start;
  font-weight: 600;
  font-size: 24px;
  color: #343a40;
  border-bottom: 1px solid #e9ecef;
  margin-bottom: 30px;
  padding-left: 20px;
}
</style>
